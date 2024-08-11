import moment from 'moment'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'

/* El componente 'NoteCard' va a ser la estructura que va a tener cada nota dentro de la aplicacion,
  asi mismo tendra los respectivos eventos para eliminar, editar o pinear cada nota
*/
function NoteCard({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>

      {/** Aqui estara la estructura respectiva que va a tomar cada nota en el Dashboard de la aplicacion */}
      <div className='flex items-center justify-between'>

        {/** Este div contendra el titlo y la fecha de la nota */}
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-sx text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
        </div>

        {/** Este icono corresponde a si queremos pinear o no la nota */}
        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'} `} onClick={onPinNote} />
      </div>

      {/** Esta etiqueta 'p' corresponde al contenido de la nota */}
      <p className='text-sm text-slate-600 mt-2'>{content?.slice(0, 60)}</p>

      {/** Este div contendra las etiquetas de la nota y las opciones para editar y/o eliminar una nota */}
      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'>{tags.map((item) => `#${item}`)}</div>

        <div className='flex items-center gap-2'>
          <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit} />
          <MdDelete className='icon-btn hover:text-red-500' onClick={onDelete} />
        </div>

      </div>

    </div>
  )
}

export default NoteCard