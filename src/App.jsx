import './App.css'
import	{ BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from './views/LandingPage/LandingPage'
import ContactPage from './views/ContactPage/ContactPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path='/contact' element={<ContactPage/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App