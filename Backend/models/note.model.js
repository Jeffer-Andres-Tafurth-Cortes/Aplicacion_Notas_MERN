// Importamos mongoose
const mongoose = require('mongoose')

// Importamos el modelo de las notas
const Schema = mongoose.Schema

// Definimos el esquema para el modelo de las notas en MongoDB
const noteSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  tags: {type: [String], default: []},
  isPinned: {type: Boolean, default: false},
  userId: {type: String, required: true},
  createdOn: {type: Date, default: new Date().getTime()}
})

// Exportamos el modelo de las notas
module.exports = mongoose.model('Note', noteSchema)