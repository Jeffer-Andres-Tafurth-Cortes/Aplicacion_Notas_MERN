import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import { useState } from "react";

// El componente 'Navbar' corresponde a un menu de navegacion
function NavBar({ userInfo, onSearchNote, handleClearSearch }) {

  // Se usa un useState para controlar lo que se escriba en la barra de busqueda
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate()
  
  // Al hacer click en el botón de logout, se llama a la función 'onLogout' haciendo que se cierre la sesion del usuario
  const onLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  // Funcion 'handleSearch' maneja la busqueda de las notas en la barra de busqueda
  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }

  // Funcion 'onClearSearch' maneja el borrado de la busqueda en la barra de busqueda
  const onClearSearch = () => {
    setSearchQuery('')
    handleClearSearch()
  }

  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notas</h2>

        {/** se importa el componente 'SearchBar */}
        <SearchBar value={searchQuery} onChange={({ target }) => {setSearchQuery(target.value)}} 
          handleSearch={handleSearch} onClearSearch={onClearSearch}
        />
      
        {/** Se importa el componente 'ProfileInfo' */}
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      
      </div>
    </>
  )
}

export default NavBar