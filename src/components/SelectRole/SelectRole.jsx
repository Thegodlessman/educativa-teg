import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import './SelectRole.css';

import logo from '../../../src/assets/logo.png';
import estRole from '../../../src/assets/estRole.png';
import proRole from '../../../src/assets/proRole.png';
import axios from 'axios';


function SelectRole({ show, handleClose, handleRoleChange }) {
    // Añadir useState para manejar el estado del rol seleccionado
    const [selectedRole, setSelectedRole] = useState('');

    const getRoleId = async (role) =>{
        try{
            const response = await axios.get(`http://localhost:4555/profile/get/role/${role}`)

            handleSelectRole(response.data.id_rol)
        }catch(error){
            console.error('Error fetching role ID:', error.response ? error.response.data : error.message);
        }
    }
    // Función para manejar la selección de rol y cerrar el modal
    const handleSelectRole = (id_rol) => {
        setSelectedRole(id_rol);
        handleRoleChange(id_rol);
        handleClose(); // Cerrar el modal después de seleccionar el rol
    };

    return (
        <Modal show={show} centered backdrop="static" keyboard={false}>
            <div className='modal-container_Role'>
                <Modal.Header className="d-flex flex-column align-items-center modal-container-header_Role" closeButton={false}>
                    <img className="me-1" src={logo} width="100" height="100" alt="Logo" />
                    <Modal.Title className="mt-2 logo-title">Educativa</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h4>Bienvenido a Educativa!</h4>
                    <h5>Selecciona tu rol...</h5>
                    <div className="d-flex justify-content-around mt-4">
                        <div className="role-selection">
                            <img className="role-image" src={estRole} width="100" height="100" alt="Estudiante" />
                            <Button 
                                className='button-estudiant_Role mt-2' 
                                onClick={() => getRoleId(`Estudiante`)}
                            >
                                Estudiante
                            </Button>
                        </div>
                        <div className="role-selection">
                            <img className="role-image" src={proRole} width="100" height="100" alt="Profesor" />
                            <Button  
                                className='button-profesor_Role mt-2'
                                onClick={() => getRoleId('Profesor')}
                            >
                                Profesor
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default SelectRole;