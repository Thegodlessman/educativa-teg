import { useState } from 'react';
import Button  from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwt_decode from 'jwt-decode'
import './NavBar.css'


function NavBar(){
    let [isLogin, setIsLogin] = useState(false)
    let user_fullname
    let rol
    
    try{
        const token = localStorage.getItem('token')
        let decodedToken = jwt_decode(token);
        user_fullname = decodedToken.full_name;
        rol = decodedToken.rol;

        if(token){
            isLogin = true
        }
    }catch(e){
        console.log(e)
    }

    const redirectLogin = () => {
        location.href = "/login"
    }

    const redirectRegister = () =>{
        location.href = "/register"
    }

    const redirectProfile = () =>{
        location.href = "/profile"
    }

    return (
        <Navbar expand="lg" className="w-full bg-light" >
            <Navbar.Brand className='fs-3 fw-bolder text-decoration-none me-5 ms-4 logo-title'  href="/">
                <img className="me-1" src='../../../src/assets/logo.png' width="50" height="50"/>
                Educativa
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-4' />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/contact">Quienes Somos</Nav.Link>
                    <Nav.Link href="/">Otra cosa</Nav.Link>

                    <NavDropdown title="Más" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {isLogin ? (
                    <div className="navbar-account_navbar" onClick={redirectProfile}>
                        <div className="navbar-img_navbar">
                            <img src='https://thumbs.dreamstime.com/z/s%C3%ADmbolo-de-perfil-masculino-inteligente-retrato-estilo-caricatura-m%C3%ADnimo-166146967.jpg' alt='Imagen de perfil'></img>
                        </div>
                        <div className="navbar-account-details_navbar">
                            <p className="navbar-account-username_navbar"> {user_fullname}</p>
                            <p className="navbar-account-rol_navbar">{rol}</p>
                    </div>
                    
            </div>
                ):(
                    <div className=''>
                        <Button className='btn me-2 rounded-4 pe-3 ps-3 text-decoration-none text-dark' variant='link' onClick={redirectRegister}>Regístrate</Button>
                        <Button className='btn btn-success me-4 rounded-4 pe-3 ps-3' onClick={redirectLogin}>Iniciar Sesión</Button>
                    </div>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar