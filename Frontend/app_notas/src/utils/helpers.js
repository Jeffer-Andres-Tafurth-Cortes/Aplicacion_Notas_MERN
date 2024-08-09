// La constante 'validateEmail' nos ayudara a verificar que el correo sea realmente un correo
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// La constante 'getInitials' nos ayudara a obtener las iniciales del nombre cuando el usuario este dentro de la aplicacion
export const getInitials = (name) => {

  // Validamos si el nombre no existe
  if (!name) return ''

  const words = name.split(' ')
  let initials = ''

  // Iteramos cada palabra del nombre
  for(let i = 0; i < Math.min(words.length, 2); i++){
    initials += words[i][0]
  }

  return initials

}
