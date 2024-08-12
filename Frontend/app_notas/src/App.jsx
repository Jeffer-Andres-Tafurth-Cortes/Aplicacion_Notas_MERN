import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { BrowserRouter as  Router, Routes, Route, Navigate  } from 'react-router-dom'

const routes = (
  <Router>
    <Routes>
      <Route path='/' element={<Navigate to={'/login'} />} />
      <Route path='/dashboard' element={<Home />} />
      <Route path='/login' element={<Login />}  />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  </Router>
)

// El componente 'App' es el encargado de renderizar cada componente hijo que se muestra en el frontend de la aplicacion
function App() {

  return (
    <>
      {/** Se importa la constante 'routes' */}
      {routes}
    </>
  )
}

export default App
