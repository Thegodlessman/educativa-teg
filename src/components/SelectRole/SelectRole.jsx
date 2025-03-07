import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './SelectRole.css';

import logo from '../../../src/assets/logo.png';
import estRole from '../../../src/assets/estRole.png';
import proRole from '../../../src/assets/proRole.png';
import axios from 'axios';

function SelectRole({ show, handleClose, handleRoleChange }) {
    const [roles, setRoles] = useState([]);

    // UseEffect para obtener los roles al abrir el modal
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4555/profile/roles', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRoles(response.data.roles);
            } catch (error) {
                console.error('Error al obtener los roles:', error.response ? error.response.data : error.message);
            }
        };

        if (show) fetchRoles(); // Solo obtiene los roles si el modal se está mostrando
    }, [show]);

    const getRoleId = async (roleName) => {
        try {
            const response = await axios.get(`http://localhost:4555/profile/get/role/${roleName}`);
            handleSelectRole(response.data.id_rol);
        } catch (error) {
            console.error('Error fetching role ID:', error.response ? error.response.data : error.message);
        }
    };

    // Función para manejar la selección de rol y cerrar el modal
    const handleSelectRole = (id_rol) => {
        handleRoleChange(id_rol);  // Llama al manejador para cambiar el rol
        handleClose(); // Cierra el modal
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
                        {/* Aquí se muestran las opciones de rol obtenidas */}
                        {roles.map((role) => (
                            <div className="role-selection" key={role.id_rol}>
                                <img className="role-image" src={role.rol_name === 'Estudiante' ? estRole : proRole} width="100" height="100" alt={role.rol_name} />
                                <Button
                                    className='button-role mt-2'
                                    onClick={() => getRoleId(role.rol_name)}
                                >
                                    {role.rol_name}
                                </Button>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default SelectRole;
