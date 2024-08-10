// Importamos 'jsonwebtoken' para el tema de autenticaciones
const jwt = require('jsonwebtoken')

// Esta funcion valida el token de autenticacion del usuario
function authenticateToken(request, response, next){
  const authHeader = request.headers["authentication"]
  const token = authHeader && authHeader.split(' ')[1]

  // Si el token no existe se envia un stado 401
  if(!token) return response.sendStatus(401)

  // Se verifica el token de acceso con la clave secreta
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return response.sendStatus(401)
    request.user = user
    next()
  })
}

module.exports = {authenticateToken}