import { getInitials } from "../../utils/helpers"

/* 
  El componente 'ProfileInfo' sera el que tiene datos relacionados de la cuenta del usuario; 
  asi mismo sera indicativo de la cuenta que se esta utilizando.
*/
function ProfileInfo({ onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials('Jeffer Tafurth')}
      </div>

      <div>
        <p className="text-sm font-medium">Jeffer Tafurth</p>
        <button onClick={onLogout} className="text-sm text-slate-700 underline">Cerrar Sesion</button>
      </div>
    </div>
  )
}

export default ProfileInfo