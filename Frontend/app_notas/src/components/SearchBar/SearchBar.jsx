import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"

// El componente 'SearchBar' sera la respectiva barra de busqueda cuando el usuario ya este dentro de la aplicacion 
function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input type="text" value={value} onChange={onChange}  placeholder="Buscar notas"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
      />

      {/** Este icono es un cruz para limpiar la barra de busqueda */}
      {value && (
        <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />
      )}

      {/** Este icono es una lupa en la barra de busqueda */}
      <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch} />
    </div>
  )
}

export default SearchBar