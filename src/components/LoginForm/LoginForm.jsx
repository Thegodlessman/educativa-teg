import React, {useState} from "react"
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

function LoginForm (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) =>  {
        event.preventDefault();
        console.log('Login de: ', {email, password});
    }

    const redirectHome = () => {
        location.href = "/"
    }

    return(
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                <h2 className='fs-3 fw-bolder text-center me-5 ms-4 logo-title' onClick={redirectHome}>
                    <img src='../../../src/assets/logo.png' width="50" height="50">
                    </img> 
                    Educativa
                </h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Cedula de Identidad</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingrese su cedula"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                    Iniciar Sesión
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default LoginForm;