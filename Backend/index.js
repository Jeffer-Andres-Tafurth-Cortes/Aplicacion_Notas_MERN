// Importamos 'dotenv' para la configuracion de las variables de entorno
require('dotenv').config()
const config = require('./config.json')
const mongoose = require('mongoose')

// Conectamos a la base de datos MongoDB
mongoose.connect(config.connectionString)

// Importamos el modelo de usuario y el modelo de las notas
const User = require('./models/user.model.js')
const Note = require('./models/note.model.js')

// Importamos express y cors
const express = require('express');
const cors = require('cors');

// Inicializamos el express
const app = express();

const jwt = require('jsonwebtoken')
const { authenticateToken } = require('./utilities')

app.use(express.json())

// Configuramos cors para permitir peticiones desde cualquier origen
app.use(cors({
  origin: "*"
}));

// Se definen las rutas de la API
app.get('/', (resquest, response) => {
  response.json({ data: 'Hello'})
})

// Se define la ruta para la creacion de usuarios (ruta -> ' /create-account ')
app.post('/create-account', async (request, response) => {
  const { fullName, email, password } = request.body

  if(!fullName){
    return response.status(400).json({ error: true, message : 'El nombre completo es requerido'})
  }

  if(!email){
    return response.status(400).json({ error: true, message : 'El correo electronico es requerido'})
  }

  if(!password){
    return response.status(400).json({ error: true, message : 'La contraseña es requerida'})
  }

  // Definimos la constante 'isUser' para responder la funcion asincronica si el usuario ya existe
  const isUser = await User.findOne({ email: email})
  if(isUser){
    return response.json({ error: true, message: 'El usuario ya existe'})
  }

  // Creamos el nuevo usuario y lo guardamos en la base de datos
  const user = new User({
    fullName,
    email,
    password
  })
  await user.save()

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '36000m'})
  response.json({ error: false, user, accessToken, message: 'Usuario creado correctamente' })
})


// Se define la ruta para que el usuario inicie sesion en la aplicacion (ruta -> ' /login ')
app.post('/login', async (request, response) => {
  const { email, password } = request.body

  if(!email){
    return response.status(400).json({ error: true, message : 'El correo electronico es requerido'})
  }

  if(!password){
    return response.status(400).json({ error: true, message : 'La contraseña es requerida'})
  }

  // Buscamos el usuario en la base de datos
  const userInfo = await User.findOne({ email: email })

  // Si el usuario no existe o la contraseña es incorrecta, respondemos con un error
  if(!userInfo){
    return response.json({ error: true, message: 'Usuario no encontrado'})
  }

  // Verificamos que el correo y la contraseña coincidan con la base de datos
  if(userInfo.email == email && userInfo.password == password){
    const user = { user: userInfo }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '36000m'})
    return response.json({ error: false, email, accessToken, message: 'Usuario logueado correctamente' })

  } else {
    return response.json({ error: true, message: 'Correo o contraseña incorrecta'})
  }
})

// Se define la ruta para obtener al usuario (ruta -> ' /get-user' )
app.get('/get-user', authenticateToken, async(request, response) => {
  const { user } = request.user

  // Se busca al usuario a traves de su ID
  const isUser = await User.findOne({ _id: user._id})

  if(!isUser){
    return response.status(401)
  }

  // Se responde con el usuario
  return response.json({ 
    user:{ fullName: isUser.fullName, email: isUser.email, '_id': isUser._id, createdOn: isUser.createdOn }, 
    message: '' 
  })
})

// Se define la ruta para agregar una nota (ruta -> ' /add-note ')
app.post('/add-note', authenticateToken, async(request, response) => {
  const { title, content, tags } = request.body
  const { user } = request.user

  if(!title){
    return response.status(400).json({ error: true, message : 'El titulo es requerido'})
  }
  
  if(!content){
    return response.status(400).json({ error: true, message : 'El contenido es requerido'})
  }
  
  // Creamos la nota y la guardamos en la base de datos
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id
    })
    await note.save()
    return response.json({ error: false, note, message: 'La nota se creo correctamente'})

  } catch(error){
    return response.status(500).json({ error: true, message: 'Error al crear la nota'})
  } 
})

// Se define la ruta para editas la notas (ruta -> ' /edit-note/:noteId ')
app.put('/edit-note/:noteId', authenticateToken, async(request, response) => {
  const noteId = request.params.noteId
  const { title, content, tags, isPinned } = request.body
  const { user } = request.user

  // Se valida si no se ha hecho cambios en los campos de Title, content, tags
  if(!title && !content && !tags){
    return response.status(400).json({ error: true, message : 'No se ha cambiado ningun campo'})
  }

  // Se busca la notas en la base de datos
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id})

    if(!note){
      return response.status(400).json({ error: true, message: 'La nota a editar no existe' })
    }

    // Se actualizan los campos de la nota y se guarda la nota con los respectivos cambios
    if(title) note.title = title
    if(content) note.content = content
    if(tags) note.tags = tags
    if(isPinned) note.isPinned = isPinned
    await note.save()
    return response.json({ error: false, note, message: 'La nota se edito correctamente'})

  } catch (error) {
    return response.status(500).json({ error: true, message: 'Error al editar la nota'})
  }
})

// Se define la ruta para obtener todas la notas (ruta -> ' /get-all-notes')
app.get('/get-all-notes', authenticateToken, async(request, response) => {
  const { user } = request.user

  // Se buscan todas las notas en la base de datos que pertenecen al usuario
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1})
    return response.json({ error: false, notes, message: 'Notas obtenidas correctamente'})

  } catch (error) {
    return response.status(500).json({ error: true, message: 'Error al obtener las notas'})
  } 
})

// Se define la ruta para eliminar un nota (ruta -> ' /delete-note/:noteId ')
app.delete('/delete-note/:noteId', authenticateToken, async(request, response) => {
  const noteId = request.params.noteId
  const { user } = request.user

  // Se busca la nota a eliminar en la base de datos
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id})

    if(!note){
      return response.status(400).json({ error: true, message: 'La nota a eliminar no existe' })
    }
    await note.deleteOne({ _id: noteId, userId: user._id})
    return response.json({ error: false, message: 'La nota se elimino correctamente'})

  } catch (error){
    return response.status(400).json({ error: true, message: 'No se pudo eliminar la nota' })
  }
})

// Se define la ruta para actualizar el valor del pineo de cada nota (ruta -> ' /update-note-pinned/:noteId ')
app.put('/update-note-pinned/:noteId', authenticateToken, async(request, response) => {
  const noteId = request.params.noteId
  const { isPinned } = request.body
  const { user } = request.user

  // Se busca la notas en la base de datos y actualiza el valor del pineo
  try{
    const note = await Note.findOne({ _id: noteId, userId: user._id})
    if(!note){
      return response.status(404).json({ error: true, message: 'La nota a pinear no existe'})
    }

    note.isPinned = isPinned
    await note.save()
    return response.json({ error: false, note, message: 'La nota se pinio correctamente'})

  } catch (error) {
    return response.status(500).json({ error: true, message: 'Error al actualizar el pineo de la nota'})
  }
})

// Se define la ruta para buscar una nota en especifico a travez de la barra de busqueda (ruta -> '/search-notes/ ')
app.get('/search-notes', authenticateToken, async (request, response) => {
  const { user } = request.user
  const { query } = request.query

  if(!query){
    return response.status(400).json({ error: true, message: 'Se requiere un parametro para la busqueda' })
  }

  try {

    // Se hace uso de 'regex' para poder hacer el match de lo que se escribe en la barra de busqueda
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: {$regex: new RegExp(query, 'i') } },
        { content: {$regex: new RegExp(query, 'i') } }
      ]
    })

    return response.json({
      error: false,
      notes: matchingNotes,
      message: 'Notas obtenidas correctamente'
    })

  } catch (error) {
    return response.status(500).json({ error: true, message: 'Error en el servidor' })
  }
})



app.listen(8000)

module.exports = app