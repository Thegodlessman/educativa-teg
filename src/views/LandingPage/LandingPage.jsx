import NavBar from "../../components/Navbar/Navbar";
import './LandingPage.css'
import welImg from '../../assets/Welcome.png'

function LandingPage(){
    return(
        <>
            <NavBar/>
            <div className="landing-container">
                <div className="landing-container-welcome">
                    <div className="landing-container-welcome-text">
                            <h1 className="welcome-title">¡Bienvenido a Educativa! </h1>
                            <span className="welcome-text">Una plataforma diseñada para mejorar el aprendizaje y ofrecer herramientas de apoyo a toda la comunidad educativa. </span>
                    </div>
                    <img className="welcome-img" src={welImg}alt="Imagen de bienvenida" />
                </div>
            </div>
        </>
    )
}

export default LandingPage;