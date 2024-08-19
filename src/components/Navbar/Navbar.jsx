import Container from 'react-bootstrap/Container';
import Button  from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

function NavBar(registrado){
    // const [isLoading, setLoading] = useState(false);
    
    // useEffect(()=>{
    //     function simulateNetworkRequest() {
    //         return new Promise((resolve) => setTimeout(resolve, 2000));
    //     }

    //     if(isLoading){
    //         simulateNetworkRequest().then(()=>{
    //             setLoading(false);
    //         });
    //     }


    // },[isLoading]);

    // const handleClick = () => setLoading(true);

    const redirectLogin = () => {
        location.href = "/login"
    }

    const redirectRegister = () =>{
        location.href = "/register"
    }

    return (
        <Navbar expand="lg" className="w-full bg-light" >
            <Navbar.Brand className='fs-3 fw-bolder text-decoration-none me-5 ms-4 logo-title'  href="/">
                <img className="me-1" src='../../../src/assets/logo.png' width="50" height="50">
                </img> 
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
                <div className=''>
                    <Button className='btn me-2 rounded-4 pe-3 ps-3 text-decoration-none text-dark' variant='link' onClick={redirectRegister}>Regístrate</Button>
                    <Button className='btn btn-success me-4 rounded-4 pe-3 ps-3' onClick={redirectLogin}>Iniciar Sesión</Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar