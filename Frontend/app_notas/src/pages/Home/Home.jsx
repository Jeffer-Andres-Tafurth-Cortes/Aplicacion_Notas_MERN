import { MdAdd } from 'react-icons/md'
import NoteCard from '../../components/Cards/NoteCard'
import Navbar from '../../components/Navbar/Navbar'
import AddEditNotes from './AddEditNotes'
import { useState } from 'react';
import Modal from 'react-modal'

// La pagina 'Home' corresponde al link de 'dashboard' es lo que se muestra cuando ya se accede a la aplicacion
function Home() {

  // Ya se importo react-modal; por ende con ayuda de un useState vamos a manejar el modal de cuando se edita una nota
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  return (
    <>
      {/** Importamos el componente 'Navbar' */}
      <Navbar />

      {/** Aqui se muestra el contenido de la pagina (componente 'NoteCard') */}
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard title={'hola'} date={'hoy'} content={'contenido'} tags={'#etiquetas'} isPinned={true} 
            onEdit={() => {}} onDelete={() => {}} onPinNote={() => {}} 
          />
        </div>
      </div>

      {/** El boton con el icono 'MdAdd' corresponde al boton en le dashboard para crear una nueva nota */}
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 
        absolute right-10 bottom-10' onClick={() => {setOpenAddEditModal({ isShown: true, type: 'add', data: null })}}>
        <MdAdd className='text-[32px] text-white'/>
      </button>

      {/** Este modal se va a ejecutar cuando se vaya a agregar una nota dando click en el boton del icono 'MdAdd' */}
      <Modal isOpen={openAddEditModal.isShown} onRequestClose={() => {}} 
        style={{ overlay:{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}} contentLabel='' 
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5'  
      >
        <AddEditNotes onClose={() => { setOpenAddEditModal({ isShown: false, type: 'add', data: null })}}
          type={openAddEditModal.type} noteData={openAddEditModal.data} 
        />
      </Modal>
      
    </>
  )
}

export default Home