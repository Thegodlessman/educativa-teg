import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { FaHome, FaBook, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { notifySuccess } from '../../utils/notify';
import CreateRoom from '../CreateRoom/CreateRoom';
// Asegúrate de importar setToken también
import { ClassContext } from "../../context/ClassContext";

function Sidebar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // Obtén setToken del contexto
  const { classes, setToken } = useContext(ClassContext); // Ya no necesitas setClasses aquí

  const handleLogout = () => {
    // 1. Elimina el token de localStorage
    localStorage.removeItem('token');

    // 2. Actualiza el estado del token en el contexto a null
    // Esto disparará el useEffect en ClassProvider que llama a fetchClasses,
    // y fetchClasses limpiará las clases porque el token es null.
    setToken(null);

    // 3. Notifica y navega
    notifySuccess("Se ha cerrado sesión");
    navigate('/login');
  };

  return (
    <div className="sidebar">
      {/* Sección superior */}
      <div className="sidebar-top">
        <div className="menu-item">
          <FaHome className="icon" />
          <span>Inicio</span>
        </div>
        <button className="btn-create-class btn-hover" onClick={() => setShowModal(true)}>
          + Crear nueva clase
        </button>
      </div>

      <div className="sidebar-middle">
        <h4 className="section-title">CLASES</h4>

        {/* El mapeo de clases sigue igual y reaccionará a los cambios en el contexto */}
        {classes.map((clase) => (
          <div key={clase.id_room} className="class-item">
            <FaBook className="icon" />
            <span>{clase.room_grate} "{clase.secc_room.trim()}"</span>
          </div>
        ))}

        <div className='scrollable-section'></div>
      </div>

      {/* Sección inferior */}
      <div className="sidebar-bottom">
        <div className="menu-item">
          <FaCogs className="icon" />
          <span>Ajustes</span>
        </div>
        <div className="menu-item" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span>Cerrar sesión</span>
        </div>
      </div>

      {/* Modal de creación de clases */}
      <CreateRoom show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
}

export default Sidebar;