import { Link } from "react-router-dom"
import NavBar from "../../components/Navbar/NavBar"
import PasswordInput from "../../components/Input/PasswordInput"

// El componente 'Login' corresponde al inicio de sesion del usuario a la aplicacion
function Login() {
  return (
    <>
      {/** Importamos el menu de navegacion de la aplicacion */}
      <NavBar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10"> 

          {/** Aqui va a estar el respectivo formulario para el inicio de sesion 'Login' */}
          <form onSubmit={(event)=>{}}>

            <h4 className="text-2xl mb-7">Iniciar Sesion</h4>

            <input type="text" placeholder="Correo Electronico" className="input-box" />

            <PasswordInput />

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