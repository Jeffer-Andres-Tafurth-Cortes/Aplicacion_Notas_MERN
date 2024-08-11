import { useState } from "react";
import TagInput from "../../components/Input/TagInput"
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

// El componente 'AddEditNotes' corresponde a agregar las notas que se editan
function AddEditNotes({ noteData, type, getAllNotes, onClose, showToastMessage }) {

  // Se usa el hook 'useState' para poder pasar la infomacion title, content y tags
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [tags, setTags] = useState(noteData?.tags || []);

  // Se usa un 'useState' para manejar los errores
  const [error, setError] = useState(null);

  // La funcion 'addNewNote' es la encargada de agregar la nota cuando el tipo sea 'add'
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags
      })

      if(response.data && response.data.note){
        showToastMessage('Nota agregada correctamente')
        getAllNotes();
        onClose();
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
  }

  // La funcion 'editNote' es la encargada de editar la nota cuando el tipo sea 'edit'
  const editNote = async() => {

    const noteId = noteData._id
    
    try {
      const response = await axiosInstance.put('/edit-note/' + noteId, {
        title,
        content,
        tags
      })
      
      if(response.data && response.data.note){
        showToastMessage('Nota actualizada correctamente')
        getAllNotes();
        onClose();
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }      
    }
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
        <label className='input-label'>TITULO</label>
        <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Ir al GYM a las 5am' 
          value={title} onChange={({ target }) => setTitle(target.value)} 
        />
      </div>

      {/** Este segundo div determina el contenido de la nota que se esta editando  */}
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENIDO</label>
        <textarea type='text' className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' 
          placeholder='La rutina de mañana es ...'rows={10} value={content} onChange={({ target }) => setContent(target.value)}
          />
      </div>

      {/** Este tercer div determina las etiquetas(tags) de la nota que se esta editando */}
      <div className='mt-3'>
        <label className='input-label'>ETIQUETAS</label>

        {/** Se importa el componente 'TagInput' para las etiquetas de cada nota creada */}
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/** Este error muestra si hay algun problema al guardar la respectiva nota */}
      {error && (
        <p className='text-red-500 text-xs pt-4'>{error}</p>
      )}

      {/** Este boton hace que se guarden los cambios de la respectiva nota */}
      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
        {type === 'edit' ? 'Actualizar Nota' : 'Agregar Nota'}
      </button>

    </div>
  )
}

export default AddEditNotes