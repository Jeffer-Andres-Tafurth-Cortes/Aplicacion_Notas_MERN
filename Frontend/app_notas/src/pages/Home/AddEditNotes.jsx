import React from 'react'

// El componente 'AddEditNotes' corresponde a agregar las notas que se editan
function AddEditNotes() {
  return (
    // Este div contiene toda la estructura de cuando se edita una nota
    <div>

      {/** Este primer div determina el titulo y el input de la nota que se esta editando */}
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Go to the gym at 5' />
      </div>

      {/** Este segundo div determina el contenido de la nota que se esta editando  */}
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Content</label>
        <textarea type='text' className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' 
          placeholder='content'rows={10}
          />
      </div>

      {/** Este tercer div determina las etiquetas(tags) de la nota que se esta editando */}
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
      </div>

      {/** Este boton hace que se guarden los cambios de la respectiva nota */}
      <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>
        Guardar Cambios
      </button>

    </div>
  )
}

export default AddEditNotes