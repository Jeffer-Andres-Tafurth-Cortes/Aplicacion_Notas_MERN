import { useState } from "react";
import NavBar from "../../components/Navbar/NavBar"
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom"

// El componente 'SignUp' corresponde al registro y/o creacion de cuenta del usuario a la aplicacion
function SignUp() {

  // Usamos el hook 'useState' para manejar el tema del nombre del usuario, el correo, la contraseña y errores en el formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  // La funcion 'handleSignUp' se ejecuta cuando el evento onSubmit del formulario de activa
  const handleSignUp = (e) => {
    e.preventDefault()

    // Validamos si el campo de nombre esta escrito
    if(!name){
      setError('Por favor escriba su nombre')
      return
    }

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


    // A partir de aqui se realiza la llamada a la API de SignUp (Registro)
  }

  return (
    <>
      {/** Importamos la barra de navegacion 'Navbar' */}

      <NavBar />

      {/** Este div contiene el formulario para el registro del usuario en la aplicacion */}
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Registrarme</h4>

            <input type="text" placeholder="Nombre" className="input-box" value={name} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Correo electronico" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />

            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" className="btn-primary">Registrarme</button>

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <p className="text-sm text-center mt-4">
              ¿Ya tienes una cuenta?{' '}
              <Link to='/Login' className="font-medium text-primary underline">
                Iniciar Sesion
              </Link>  
            </p>
          </form>
        </div>

      </div>
    </>
  )
}

export default SignUp