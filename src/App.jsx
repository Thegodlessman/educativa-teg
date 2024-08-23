import './App.css'
import	{ BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from './views/LandingPage/LandingPage'
import ContactPage from './views/ContactPage/ContactPage'
import LoginPage from './views/LoginPage/LoginPage.jsx'
import RegisterPage from './views/RegisterPage/RegisterPage.jsx'
import ProfilePage from './views/ProfilePage/ProfilePage.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path='/contact' element={<ContactPage/>}/>
          <Route exact path='/login' element={<LoginPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>
          <Route exact path='/profile' element={<ProfilePage/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App