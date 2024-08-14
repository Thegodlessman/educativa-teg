import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarExample(){
    return(
        <>
         <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">
                    <img
                    alt='imagen'
                    src='https://img.freepik.com/vector-premium/logotipo-educacion-libro-objeto-elemento-humano-aprendizaje-feliz-diseno-vectores-creativos_490655-85.jpg?w=740'
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Educativa
                </Navbar.Brand>
            </Container>
        </Navbar>
        </>
    );
}

export default NavbarExample;