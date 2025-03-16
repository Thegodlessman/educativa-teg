import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import NavBar from "../../components/Navbar/Navbar";
import './LandingPage.css'
import axios from 'axios';

import SelectRole from '../../components/SelectRole/SelectRole.jsx';
import welImg from '../../assets/Welcome.png'
import { notifyError, notifySuccess } from '../../utils/notify.js';

function LandingPage(){
    const [activeRole, setActiveRole] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado que controla la visibilidad del modal
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                setActiveRole(decodedToken.rol_name); // Usamos el nombre del rol
                setUserId(decodedToken.id_user);
            } catch (e) {
            console.error('Error decoding token:', e);
            }
        }
    }, []);

   const handleClose = () => setShowModal(false); // Cerrar el modal

   // Esta función se llama al hacer click en un nuevo rol
    const handleRoleChange = async (newRole) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:4555/users/update/role/${userId}`,
                { id_rol: newRole },  // Enviamos el nuevo rol
                { headers: { Authorization: `Bearer ${token}` } }
        );

         // Guardamos el nuevo token en el localStorage
            localStorage.setItem('token', response.data.tokenSession);

            // Actualizamos el rol activo en el estado
            setActiveRole(response.data.user.rol);

            notifySuccess('Tu rol ha sido cambiado')
            handleClose();
        } catch (error) {
            notifyError('Error actualizando el rol activo:', error.response ? error.response.data : error.message)
        }
    };


    useEffect(() => { 
        if (activeRole === 'usuario') {
             setShowModal(true); // Abrir el modal si el rol es 'usuario'
        }
    }, [activeRole]);
    
    return(
        <>
            <NavBar/>
            <div className="landing-container">
                <div className="landing-container-welcome">
                    <div className="landing-container-welcome-text">
                            <h1 className="welcome-title">¡Bienvenido a Educativa! </h1>
                            <span className="welcome-text">Una plataforma diseñada para mejorar el aprendizaje y ofrecer herramientas de apoyo a toda la comunidad educativa. </span>
                            <div className="select-rol_landing-page">
                                <span className='select-rol-text_landing-page'>Escoge tu rol para comenzar!</span>
                                <button className='select-rol-button_landing-page' onClick={() => setShowModal(true)}>Cambiar rol</button>

                                <SelectRole
                                show={showModal} // El modal se debe mostrar si showModal es true
                                handleClose={handleClose}
                                handleRoleChange={handleRoleChange}
                                />
                            </div>
                    </div>
                    <img className="welcome-img" src={welImg}alt="Imagen de bienvenida" />
                </div>
            </div>
        </>
    )
}

export default LandingPage;