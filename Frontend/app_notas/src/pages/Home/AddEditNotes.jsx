import { useState } from "react";
import TagInput from "../../components/Input/TagInput"
import { MdClose } from "react-icons/md";

// El componente 'AddEditNotes' corresponde a agregar las notas que se editan
function AddEditNotes({ noteData, type, onClose }) {

  // Se usa el hook 'useState' para poder pasar la infomacion title, content y tags
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  // Se usa un 'useState' para manejar los errores
  const [error, setError] = useState(null);

  // La funcion 'addNewNote' es la encargada de agregar la nota cuando el tipo sea 'add'
  const addNewNote = async() => {

  }

  // La funcion 'editNote' es la encargada de editar la nota cuando el tipo sea 'edit'
  const editNote = async() => {

  }

  // La funcion 'handleAddNote' se ejecuta cuando se da click en el button 'Guardar Nota' para agregar la respectiva nota al dashboard
  const handleAddNote = () => {
    if(!title){
      setError('La nota debe de tener un titulo')
      return
    }

    if(!content){
      setError('La nota debe de tener contenido')
      return
    }

    setError('')

    if(type === 'edit'){
      editNote()
    } else {
      addNewNote()
    }

  }

  return (
    // Este div contiene toda la estructura de cuando se edita una nota
    <div className='relative'>
      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-50' onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      {/** Este primer div determina el titulo y el input de la nota que se esta editando */}
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Go to the gym at 5' 
          value={title} onChange={({ target }) => setTitle(target.value)} 
        />
      </div>

      {/** Este segundo div determina el contenido de la nota que se esta editando  */}
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Content</label>
        <textarea type='text' className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' 
          placeholder='content'rows={10} value={content} onChange={({ target }) => setContent(target.value)}
          />
      </div>

      {/** Este tercer div determina las etiquetas(tags) de la nota que se esta editando */}
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>

        {/** Se importa el componente 'TagInput' para las etiquetas de cada nota creada */}
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/** Este error muestra si hay algun problema al guardar la respectiva nota */}
      {error && (
        <p className='text-red-500 text-xs pt-4'>{error}</p>
      )}

      {/** Este boton hace que se guarden los cambios de la respectiva nota */}
      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
        Guardar Nota
      </button>

    </div>
  )
}

export default AddEditNotes