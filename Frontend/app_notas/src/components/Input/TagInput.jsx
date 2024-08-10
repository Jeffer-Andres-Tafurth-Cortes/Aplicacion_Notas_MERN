import { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md'

// Este componente input 'TagInput' corresponde al input de crear los tags en cada nota dentro del componente 'AddEditNotes'
function TagInput({ tags, setTags }) {

  // Con un 'useState' se va a manejar el valor escrito en el input de las etiquetas
  const [inputValue, setInputValue] = useState('')

  // La funcion 'handleInputChange' va a tomar el vamor escrito en el input
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  // La funcion 'addNewTag' lo que hara es determinar la etiqueta de la nota (el valor de la etiqueta sera puesto en el input)
  const addNewTag = () => {
    if(inputValue.trim() !== ''){
      setTags([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  /* La funcion 'handlekeyDown' responde al evento 'onKeyDown' del input, en donde usando el boton de 'enter' del declado va a agregar
    la respectiva etiqueta a la nota
  */
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      addNewTag()
    }
  }


  // La funcion 'handleRemoveTag' lo que hace es eliminar una etiqueta dentro de una nota
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div>

      {tags?.length > 0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
          {tags.map((tag, index) => (
            <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}


      {/** Este div va a contener la estructura de del input de las etiquetas que se crean cuando se esta creando una nota */}
      <div className='flex items-center gap-4 mt-3'>

        <input type="text" className='text-sm bg-transparent border px-3 py-2 rounded outline-none' 
          placeholder='Añadir etiquetas(tags)' value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />

        <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700' onClick={() => addNewTag()}>
          <MdAdd className='text-2xl text-blue-700 hover:text-white' />
        </button>

      </div>
    </div>
  )
}

export default TagInput