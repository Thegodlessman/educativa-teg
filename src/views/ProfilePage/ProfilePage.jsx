import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout.jsx";
import ClassList from "../../components/ClassList/ClassList.jsx";
import SelectRole from "../../components/SelectRole/SelectRole.jsx";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { notifyError, notifySuccess } from '../../utils/notify.js';

import "./ProfilePage.css";


function ProfilePage() {
   const [showModal, setShowModal] = useState(false);
   const [userId, setUserId] = useState('');
   const [activeRole, setActiveRole] = useState(null);

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         try {
            const decoded = jwt_decode(token);
            setUserId(decoded.id_user);
            setActiveRole(decoded.rol_name);
         } catch (err) {
            console.error("Error decoding token:", err);
         }
      }
   }, []);

   useEffect(() => {
      if (activeRole === 'usuario') {
         setShowModal(true);
      }
   }, [activeRole]);

   const handleClose = () => setShowModal(false);

   const handleRoleChange = async (newRole) => {
      try {
         const token = localStorage.getItem('token');
         const response = await axios.patch(
            `http://localhost:4555/users/update/role/${userId}`,
            { id_rol: newRole },
            { headers: { Authorization: `Bearer ${token}` } }
         );

         localStorage.setItem('token', response.data.tokenSession);
         setActiveRole(response.data.user.rol);
         notifySuccess("Tu rol ha sido actualizado.");
         handleClose();
      } catch (error) {
         notifyError("Error al actualizar el rol.");
      }
   };

   return (
      <DashboardLayout>
         <ClassList />
         <SelectRole
            show={showModal}
            handleClose={handleClose}
            handleRoleChange={handleRoleChange}
         />
      </DashboardLayout>
   );
}

export default ProfilePage; 