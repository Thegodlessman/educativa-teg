import React, {useState} from "react"
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

import './LoginForm.css'

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
        <Container className="w-75">
            <Row className="justify-content-md-center mt-4">
                <Col xs={12} md={6}>
                <h3 className='mb-5 text-center logo-title fw-bold' onClick={redirectHome}>
                    <img className="me-1" src='../../../src/assets/logo.png' width="60" height="60">
                    </img> 
                    Educativa
                </h3>
                <h3 className="mb-5 fw-bold text-center">Iniciar sesión</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className="border-secondary border-opacity-50 border-2 p-3 rounded-4 input-login"
                        type="email"
                        placeholder="Ingrese su cedula"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Control className="border-2 border-opacity-50 border-secondary p-3 rounded-4 input-login"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <a className="forgotPass-link" href="/">¿Has olvidado tu contraseña?</a>

                    <Button type="submit" className="w-100 p-3 rounded-4 mt-4 fw-bold login-btn">
                    Iniciar Sesión
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default LoginForm;