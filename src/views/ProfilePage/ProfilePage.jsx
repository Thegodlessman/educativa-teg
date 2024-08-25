// src/views/ProfilePage/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ProfileLanding from '../../components/ProfileLanding/ProfileLanding.jsx';
import SelectRole from '../../components/SelectRole/SelectRole.jsx';

function ProfilePage() {
   const [userRole, setUserRole] = useState(null);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
            try {
               const decodedToken = jwt_decode(token);
               const role = decodedToken.role;
               setUserRole(role);

                // Mostrar modal si el rol es 'Usuario'
               if (role === 'Usuario') {
                  setShowModal(true);
               }
            } catch (e) {
               console.error('Error decoding token:', e);
            }
      }
   }, []);

   const handleClose = () => setShowModal(false);
   const handleRoleChange = (newRole) => {
      // Aquí puedes agregar la lógica para actualizar el rol en el backend.
      alert(newRole)
      handleClose();
   };

   return (
      <>
         <ProfileLanding />
         <SelectRole
               show={showModal}
               handleClose={handleClose}
               handleRoleChange={handleRoleChange}
            />
      </>
   );
}

export default ProfilePage;
