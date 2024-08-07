import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Se crean las rutas para la aplicacion
const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<SignUp />} />
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
