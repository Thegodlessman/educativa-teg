import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import NavBar from "../../components/Navbar/Navbar";
import SelectRole from '../../components/SelectRole/SelectRole.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';

function ProfilePage() {
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

         handleClose();
      } catch (error) {
         console.error('Error actualizando el rol activo:', error.response ? error.response.data : error.message);
      }
   };

   // Cuando el rol activo es "usuario", mostrar el modal
   useEffect(() => { 
      if (activeRole === 'usuario') {
         setShowModal(true); // Abrir el modal si el rol es 'usuario'
      }
   }, [activeRole]);

   return (
      <div>
         <NavBar></NavBar>
         <div style={{ display: 'flex' }}>
         <Sidebar />
         </div>
         
      </div>
   );
}

export default ProfilePage;
