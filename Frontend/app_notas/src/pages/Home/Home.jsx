import { MdAdd } from 'react-icons/md'
import NoteCard from '../../components/Cards/NoteCard'
import Navbar from '../../components/Navbar/NavBar'
import AddEditNotes from './AddEditNotes'
import { useEffect, useState } from 'react';
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToasMessage/Toast';
import EmptyCard from '../../components/EmptyCards/EmptyCard';
import addNotesImg from '../../assets/images/addNotesImg.svg'
import noMatchNotes from '../../assets/images/noMatchNotes.svg'

// La pagina 'Home' corresponde al link de 'dashboard' es lo que se muestra cuando ya se accede a la aplicacion
function Home() {

  // Ya se importo react-modal; por ende con ayuda de un useState vamos a manejar el modal de cuando se edita una nota
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: true,
    message: '',
    type: 'add'
  });

  // Ya se importo react-router-dom; por ende con ayuda de un useState vamos a manejar las notas del dashboard
  const [allNotes, setAllNotes] = useState([])

  // Ya se importo react-router-dom; por ende con ayuda de un useState vamos a manejar el usuario logueado
  const [userInfo, setUserInfo] = useState(null)

  // Con un hook 'useState' vamos a realizar la busqueda de las notas con la barra de busqueda 
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit'})
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: false,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: true,
      message: ''
    })
  }

  // Con la funcion 'getUserInfo' Obtenemos la respectiva informacion del usuario
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user')
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }

    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear()
        navigate('/login')
      }
    }
  }

  // Con la funcion 'getAllNotes' se hace el llamado para ver todas las notas (las notas respectivas a cada usuario)
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes')
      
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }

    } catch (error) {
      console.log('Error al obtener las notas')
    }
  }

  // Con la funcion 'deleteNote' se hace el llamado para eliminar una nota
  const deleteNote = async (data) => {
    const noteId = data._id

    try {
      const response  = await axiosInstance.delete('/delete-note/' + noteId)

      if (response.data && !response.data.error) {
        showToastMessage('Nota eliminada correctamente', 'delete')
        getAllNotes()
      }

    } catch (error) {
      if(error.response.data && error.response.data && error.response.data.message){
        console.log('Error inesperados');
        
      }
    }
  }

  // Con la funcion 'onSearchNote' se hace busqueda de alguna nota a traves de la barra de busqueda
  const onSearchNote = async (query) => {
    try{
      const response = await axiosInstance.get('/search-notes', {
        params: {query}
      })

      if(response.data && response.data.notes){
        setIsSearch(true)
        setAllNotes(response.data.notes)
      }

    } catch (error) {
      console.log(error);
      
    }
  }

  // La funcion 'updateIsPinned' es para pinear una nota
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id

    try{
      const response = await axiosInstance.put('/update-note-pinned/' + noteId, {
        'isPinned': !noteData.isPinned
      })

      if(response.data && response.data.note){
        showToastMessage('Nota pineda correctamente', 'pin')
        getAllNotes()
      }

    } catch (error) {
      console.log(error);
    }
  }

  // La funcion 'handleClearSearch' limpia la busqueda de las notas y muestra todas las notas existentes
  const handleClearSearch = () => {
    setIsSearch(false)
    getAllNotes()
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo()
    return () => {}
  }, []);

  return (
    <>
      {/** Importamos el componente 'Navbar' */}
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      {/** Aqui se muestra el contenido de la pagina (componente 'NoteCard') */}
      <div className='container mx-auto'>
        {allNotes.length > 0
          ? (
            <div className='grid grid-cols-3 gap-4 mt-8'>
              {/** Se mapean las notas respectivas de cada usuario */}
              {allNotes.map((item, index) => (
                <NoteCard key={item._id} title={item.title} date={item.createdOn} 
                  content={item.content} tags={item.tags} isPinned={item.isPinned} 
                  onEdit={() => handleEdit(item)} onDelete={() => deleteNote(item)} 
                  onPinNote={() => updateIsPinned(item)} 
                />
              ))}
            </div>
          ) : (
            <EmptyCard imgSrc={isSearch ? noMatchNotes : addNotesImg} 
              message={isSearch 
                ? 'Ninguna nota coincide con tu busqueda, tal vez la nota esta escrita de otra manera' 
                : 'Agrega una nueva nota, puedes escribir sobre eventos, pensamientos, ideas o pequeños recordatorios'
              } 
            />
          )
        }
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
        <AddEditNotes type={openAddEditModal.type} noteData={openAddEditModal.data}
          onClose={() => { setOpenAddEditModal({ isShown: false, type: 'add', data: null })}} 
          getAllNotes={getAllNotes} showToastMessage={showToastMessage}
        />
      </Modal>

      {/** Importamos el componente de 'Toast' */}
      <Toast isShown={showToastMsg.isShown} message={showToastMsg.message} type={showToastMsg.type} 
        onClose={handleCloseToast} 
      />
      
    </>
  )
}

export default Home