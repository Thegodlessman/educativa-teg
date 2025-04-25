import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './SelectRole.css';

import logo from '../../../src/assets/logo.png';
import axios from 'axios';
import { notifyError } from '../../utils/notify';

const teacherRole = import.meta.env.VITE_CLOUDNARY_IMAGE + 'educativa/TeacherRole'
const studentRole = import.meta.env.VITE_CLOUDNARY_IMAGE + 'educativa/StudentRole'

function SelectRole({ show, handleClose, handleRoleChange }) {
    const [roles, setRoles] = useState([]);  

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4555/profile/roles', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const allowedRoles = response.data.roles.filter(role =>
                    role.rol_name === 'Estudiante' || role.rol_name === 'Profesor'
                );
                setRoles(allowedRoles);
            } catch (error) {
                notifyError('Error al obtener los roles:', error.response ? error.response.data : error.message)
            }
        };

        if (show) fetchRoles(); // Solo obtiene los roles si el modal se está mostrando
    }, [show]);

    const getRoleId = async (roleId) => {
        try {
            const response = await axios.get(`http://localhost:4555/profile/get/role/${roleId}`);
            handleSelectRole(response.data.id_rol);
        } catch (error) {
            notifyError('Error fetching role ID:', error.response ? error.response.data : error.message)
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
                        {roles.length > 0 ? (
                            roles.map((role) => (
                                <div className="role-selection" key={role.id_rol}>
                                    <img className="role-image" src={role.rol_name === 'Estudiante' ? studentRole : teacherRole} width="100" height="100" alt={role.rol_name} />
                                    <Button
                                        className='button-role mt-2'
                                        onClick={() => getRoleId(role.rol_name)}
                                    >
                                        {role.rol_name}
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p>No hay roles disponibles</p>
                        )}
                    </div>
                    <Button variant="secondary" className="mt-3" onClick={handleClose}>Cerrar</Button>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default SelectRole;
