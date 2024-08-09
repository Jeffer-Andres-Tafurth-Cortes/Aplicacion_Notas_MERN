import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from "react-router-dom"

// El componente 'Navbar' corresponde a un menu de navegacion
function NavBar() {

  const navigate = useNavigate

  // Al hacer click en el botón de logout, se llama a la función 'onLogout' haciendo que se cierre la sesion del usuario
  const onLogout = () => {
    navigate('/login')
  }

  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notas</h2>
      
        {/** Se importa el componente 'ProfileInfo' */}
        <ProfileInfo onLogout={onLogout} />
      
      </div>
    </>
  )
}

export default NavBar