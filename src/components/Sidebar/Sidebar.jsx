import React from 'react';
import './Sidebar.css';

// Importa íconos desde react-icons (instala con: npm install react-icons)
import { FaHome, FaLock, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem('token')

    localStorage.removeItem('usuario')

    Navigate('/login')
  }

  return (
    <div className="sidebar">
      {/* Sección superior */}
      <div className="sidebar-top">
        {/* Opción: Inicio */}
        <div className="menu-item">
          <FaHome className="icon" />
          <span>Inicio</span>
        </div>
        
        {/* Botón: Crear nueva clase */}
        <button className="btn-create-class">
          + Crear nueva clase
        </button>
      </div>

      {/* Sección de clases */}
      <div className="sidebar-middle">
        <h4 className="section-title">CLASES</h4>
        
        <div className="class-item">
          <FaLock className="icon" />
          <span>4to "A"</span>
          <span className="badge-new">NEW</span>
        </div>
        <div className="class-item">
          <FaLock className="icon" />
          <span>5to "A"</span>
          <span className="badge-new">NEW</span>
        </div>
        <div className="class-item">
          <FaLock className="icon" />
          <span>6to "A"</span>
          <span className="badge-new">NEW</span>
        </div>
        <div className="class-item">
          <FaLock className="icon" />
          <span>6to "B"</span>
          <span className="badge-new">NEW</span>
        </div>
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
    </div>
  );
}

export default Sidebar;
