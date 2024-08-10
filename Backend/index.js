// Importamos express y cors
const express = require('express');
const cors = require('cors');

// Inicializamos el express
const app = express();

app.use(express.json())

// Configuramos cors para permitir peticiones desde cualquier origen
app.use(cors({
  origin: "*"
}));

// Se definen las rutas de la API
app.get('/', (resquest, response) => {
  response.json({ data: 'Hello'})
})

app.listen(8000)

module.exports = app