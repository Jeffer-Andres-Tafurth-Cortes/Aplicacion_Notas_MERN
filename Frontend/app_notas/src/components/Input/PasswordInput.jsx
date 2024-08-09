import { useState } from "react"
import { FaRegEye, FaEyeSlash } from  "react-icons/fa6"

// El componente 'PasswordInput' corresponde al input de la contraseña en el formulario de Login
function PasswordInput({ value, onChange, placeholder }) {

  // Al hacer click en el botón de ver contraseña, cambia el estado de 'isShowPassword'
  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)  
  }

  return (
    <div className="flex items-center bg-trasparent border-[1.5px] px-5 rounded mb-3">
      <input value={value} onChange={onChange} type={isShowPassword ? 'text' : 'password'} placeholder={placeholder || 'Contraseña'} 
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {/** Se implementa un operador ternario para mostrar la contraseña */}
      {isShowPassword 
        ? <FaRegEye size={22} className="text-primary cursor-pointer" onClick={() =>  toggleShowPassword()} />
        : <FaEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={() =>  toggleShowPassword()} />
      } 

    </div>
  )
}

export default PasswordInput