import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

import './LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Ingrese su correo, por favor';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'El correo electronico no es valido';
        if (!password) newErrors.password = 'Ingrese su contraseña, por favor';
        else if (password.length < 6) newErrors.password = 'La contraseña debe tener más de 6 caracteres';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            console.log('Login attempted with:', { email, password });
            console.log(setErrors)
            // Aquí es donde normalmente enviarías la solicitud al servidor
        }
    };

    const redirectHome = () => {
        location.href = "/";
    };

    return (
        <Container className="login-container">
            <Row className="login-container mt-4">
                <Col xs={12} md={6}>
                    <h1 className='mb-4 text-center logo-title fw-bolder' onClick={redirectHome}>
                        <img className="me-1" src='../../../src/assets/logo.png' width="100" height="100" alt="logo" />
                    </h1>
                    <h2 className="mb-5 fw-bold text-center">Iniciar sesión</h2>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </Alert>
                    )}
                    <Form className="text-center" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control className="border-secondary border-opacity-50 border-2 p-3 rounded-4 input-login"
                                type="email"
                                placeholder="Ingrese su correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control className="border-2 border-opacity-50 border-secondary p-3 rounded-4 input-login"
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                        </Form.Group>

                        <Button type="submit" className="btn w-100 p-3 rounded-4 mt-4 mb-3 fw-bold login-btn btn-success">
                            Iniciar Sesión
                        </Button>

                        <div className="login-link-container">
                            <span>¿Aún no tienes una cuenta? <a className="text-decoration-none forgotPass-link" href="/register">
                                Regístrate
                            </a></span>

                            <a className="text-decoration-none forgotPass-link" href="/">¿Has olvidado tu contraseña?</a>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;
