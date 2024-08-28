import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ProfileLanding from '../../components/ProfileLanding/ProfileLanding.jsx';
import SelectRole from '../../components/SelectRole/SelectRole.jsx';
import axios from 'axios'; // Asegúrate de importar axios

function ProfilePage() {
   const [userRole, setUserRole] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [userId, setUserId] = useState(''); // Añadir userId

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
            try {
               const decodedToken = jwt_decode(token);
               const role = decodedToken.role;
               setUserRole(role);
               setUserId(decodedToken.id); // Guardar userId del token

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

   const handleRoleChange = async (newRole) => {
      const token = localStorage.getItem('token'); // Obtén el token de localStorage

      try {
         const decodedToken = jwt_decode(token);
         const id_user = decodedToken.id_user
         setUserId(id_user)
         console.log(newRole)
         const response = await axios.patch(
            `http://localhost:4555/profile/role/${id_user}`, { id_role: newRole});
         console.log('Role updated:', response.data);

         localStorage.setItem('token', response.data.tokenSession);

         console.log(response.data.tokenSession);

         handleClose();
      } catch (error) {
            console.error('Error updating role:', error.response ? error.response.data : error.message);
      }
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
