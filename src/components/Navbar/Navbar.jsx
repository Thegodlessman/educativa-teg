import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar({name}){
    return (
        <Navbar expand="lg" className="w-full " >
            <Navbar.Brand className='fs-3 fw-bolder text-decoration-none me-5 ms-4 title'  href="/">
                <img src='../../../src/assets/logo.png' width="50" height="50">
                </img> 
                {name}
            </Navbar.Brand>
            <Container className=''>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Quienes Somos</Nav.Link>
                    <Nav.Link href="/contact">Contacto</Nav.Link>
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
                </Navbar.Collapse>
            </Container>
                
            
        </Navbar>
    )
}

export default NavBar