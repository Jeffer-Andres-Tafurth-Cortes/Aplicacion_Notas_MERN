import { Link, useNavigate } from "react-router-dom"
import NavBar from "../../components/Navbar/NavBar"
import PasswordInput from "../../components/Input/PasswordInput"
import { validateEmail } from "../../utils/helpers"
import { useState } from "react"
import axiosInstance from "../../utils/axiosInstance"

// El componente 'Login' corresponde al inicio de sesion del usuario a la aplicacion
function Login() {

  // Usamos el hook 'useState' para manejar el tema del correo, contraseña y errores en el formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // La funcion 'handleLogin' se ejecuta cuando el evento onSubmit del formulario de activa
  const handleLogin = async (e) => {
    e.preventDefault()

    // Se agrega la constate 'validateEmail' para validar el correo electronico
    if(!validateEmail(email)){
      setError('Por favor use correo electronico valido')
      return
    }

    // Validamos si el campo de contraseña esta escrito
    if(!password){
      setError('Por favor escriba una contraseña')
      return
    }
    setError('')


    // A partir de aqui se realiza la llamada a la API de Login (iniciar sesion)
    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem('token', response.data.accessToken)
        navigate('/dashboard')
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      } else {
       setError('Ocurrio un error al intentar iniciar sesion')
      }
    }
  }

  return (
    <>
      {/** Importamos el menu de navegacion de la aplicacion */}
      <NavBar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10"> 

          {/** Aqui va a estar el respectivo formulario para el inicio de sesion 'Login' */}
          <form onSubmit={handleLogin}>

            <h4 className="text-2xl mb-7">Iniciar Sesion</h4>

            <input type="text" placeholder="Correo Electronico" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />

            {/** Importamos el componente 'PasswordInput' */}
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">Iniciar sesion</button>

            <p className="text-sm text-center mt-4">
              ¿Aun no tienes cuenta?{' '}
              <Link to='/SignUp' className="font-medium text-primary underline">
                Registrarme
              </Link>  
            </p>

          </form>

        </div>
      </div>
    </>
  )
}

export default Login