import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import './SelectRole.css';

function SelectRole({ show, handleRoleChange }) {
    return (
        <Modal show={show} centered backdrop="static" keyboard={false}>
            <div className='modal-container_Role'>
                <Modal.Header className="d-flex flex-column align-items-center modal-container-header_Role" closeButton={false}>
                    <img className="me-1" src='../../../src/assets/logo.png' width="100" height="100" alt="Logo" />
                    <Modal.Title className="mt-2 logo-title">Educativa</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h4>Bienvenido a Educativa!</h4>
                    <h5>Selecciona tu rol...</h5>
                    <div className="d-flex justify-content-around mt-4">
                        <div className="role-selection">
                            <img className="role-image" src='../../../src/assets/estRole.png' width="100" height="100" alt="Estudiante" />
                            <Button 
                                className='button-estudiant_Role mt-2' 
                                onClick={() => handleRoleChange('Estudiante')}
                            >
                                Estudiante
                            </Button>
                        </div>
                        <div className="role-selection">
                            <img className="role-image" src='../../../src/assets/proRole.png' width="100" height="100" alt="Profesor" />
                            <Button  
                                className='button-profesor_Role mt-2'
                                onClick={() => handleRoleChange('Profesor')}
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
