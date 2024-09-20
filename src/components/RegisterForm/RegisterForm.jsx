import React, {useState} from "react"
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap'
import axios from "axios";

import { ping } from 'ldrs'

ping.register()

import './RegisterForm.css'

function RegisterForm(){
    const [user_name, setName] = useState('');
    const [user_lastname, setLastName] = useState('');
    const [user_ced, setCed_user] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!user_email) newErrors.user_email = 'Ingrese su correo, por favor';
        else if (!/\S+@\S+\.\S+/.test(user_email)) newErrors.user_email = 'El correo electronico no es valido';

        if (!user_password) newErrors.user_password = 'Ingrese una contraseña, por favor';
        else if (user_password.length < 6) newErrors.user_password = 'La contraseña debe tener más de 6 caracteres';

        if(!user_name) newErrors.user_name = 'Ingrese un nombre, porfavor';
        
        if(!user_lastname) newErrors.user_lastname = 'Ingrese un apellido, por favor';

        if(!user_ced) newErrors.user_ced = 'Ingrese una cedula, por favor'

        if(confirmPassword != user_password) newErrors.confirmPassword = 'Las contraseñas deben coincidir'

        return newErrors;
    };

    const handleSubmit = async (event) => {
        const userData = {
            user_ced, user_name, user_lastname, user_email, user_password
        }
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        } else {
            setErrors({});
            setIsRegistered(true);
            
            setTimeout(async() => {
                try{
                    const response = await axios.post('http://localhost:4555/users',userData);
                    console.log(response.data)
                    
                    setRegisterSuccess(true);
                    setTimeout(() => {
                        redirectLogin()
                    }, 1500);
    
                }catch(error){
                    console.error('Register Failed', error);
                    setIsRegistered(false)
                    setRegisterError(error.response.data.message);
                }
            }, 2000);

        }
    };

    const redirectLogin = () =>{
        location.href = '/login'
    }
    const redirectHome = () => {
        location.href = "/";
    };

    return(
        
        <Container className="register-container">
            <Row className="register-container mt-4">
                <Col xs={12} md={6}>
                    <h1 className='mb-4 text-center logo-title fw-bolder' onClick={redirectHome}>
                        <img className="me-1" src='../../../src/assets/logo.png' width="100" height="100" alt="logo" />
                    </h1>
                    <h2 className="mb-5 fw-bold text-center">Regístrate</h2>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                            {Object.values(errors).map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </Alert>
                    )}
                    {registerError && (
                        <Alert variant="danger">
                            {registerError}
                        </Alert>
                    )}{registerSuccess && (
                        <Alert variant="success">
                            Te has registrado exitosamente
                        </Alert>
                    )}
                        <Form className="form-container text-center" onSubmit={handleSubmit}>
                            <div className="name-lastname-container">
                                <Form.Group className="w-100 mb-3" controlId="formBasicName">
                                    <Form.Control className="border-secondary border-opacity-50 border-2 p-3 rounded-4 input-login"
                                        type="name"
                                        placeholder="Ingrese su nombre"
                                        value={user_name}
                                        name="user_name"
                                        onChange={(e) => setName(e.target.value)}
                                        isInvalid={!!errors.name}
                                    />
                                </Form.Group>

                                <Form.Group className="w-100 mb-3" controlId="formBasicLastName">
                                    <Form.Control className="border-secondary border-opacity-50 border-2 p-3 rounded-4 input-login"
                                        type="name"
                                        placeholder="Ingrese su apellido"
                                        value={user_lastname}
                                        name="user_lastname"
                                        onChange={(e) => setLastName(e.target.value)}
                                        isInvalid={!!errors.lastName}
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3" controlId="formBasicCed">
                                <Form.Control className="border-secondary border-opacity-50 border-2 p-3 rounded-4 input-login"
                                    type="cedula"
                                    placeholder="Ingrese su cedula"
                                    value={user_ced}
                                    name="user_ced"
                                    onChange={(e) => setCed_user(e.target.value)}
                                    isInvalid={!!errors.ced_user}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control className="border-secondary border-opacity-50 border-2 p-3 rounded-4 input-login"
                                    type="email"
                                    placeholder="Ingrese su correo"
                                    value={user_email}
                                    name="user_email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    isInvalid={!!errors.email}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control className="border-2 border-opacity-50 border-secondary p-3 rounded-4 input-login"
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    value={user_password}
                                    name="user_password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={!!errors.password}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Control className="border-2 border-opacity-50 border-secondary p-3 rounded-4 input-login"
                                    type="password"
                                    placeholder="Confirme su contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    isInvalid={confirmPassword != user_password}
                                />
                            </Form.Group>
                            {isRegistered ? (
                                    <div className='margin-animacion_Register'>
                                        <l-ping
                                        size="90"
                                        speed="3" 
                                        color="#157347" 
                                        ></l-ping>
                                    </div>
                                ):(<Button type="submit" 
                                className="btn w-100 p-3 rounded-4 mt-4 mb-3 fw-bold login-btn btn-success"
                                >Crear Cuenta
                                </Button>)}
                            
                            <div className="login-link-container">
                                <span>¿Ya tienes una cuenta? <a className="text-decoration-none forgotPass-link" href="/login">
                                    Iniciar Sesión
                                </a></span>
                            </div>

                        </Form>
                </Col>
            </Row>
        </Container>
    )


}

export default RegisterForm;