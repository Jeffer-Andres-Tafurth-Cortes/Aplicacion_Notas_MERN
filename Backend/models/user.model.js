// Importamos mongoose
const mongoose = require('mongoose')

// Importamos el modelo de usuario
const Schema = mongoose.Schema

// Definimos el esquema para el modelo de usuario en MongoDB
const userSchema = new Schema({
  fullName: {type: String},
  email: {type: String},
  password: {type: String},
  createdOn: {type: Date, default: new Date().getTime()}
})

// Exportamos el modelo de usuario
module.exports = mongoose.model('User', userSchema)