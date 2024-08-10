import { MdAdd } from 'react-icons/md'
import NoteCard from '../../components/Cards/NoteCard'
import Navbar from '../../components/Navbar/Navbar'
import AddEditNotes from './AddEditNotes'

// La pagina 'Home' corresponde al link de 'dashboard' es lo que se muestra cuando ya se accede a la aplicacion
function Home() {
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
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {}}>
        <MdAdd className='text-[32px] text-white'/>
      </button>
      
      <AddEditNotes />
    </>
  )
}

export default Home