import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

function App() {

  return (
    <>
      {/** Se importa el componente 'Home' */}
      <Home />

      {/** Se importan los componentes 'Login' y 'SignUp' */}
      <Login />
      <SignUp />
    </>
  )
}

export default App
