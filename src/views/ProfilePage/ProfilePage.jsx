import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import NavBar from "../../components/Navbar/Navbar";
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import LandingTeacher from '../../components/LandingTeacher/LandingTeacher.jsx';

import './ProfilePage.css'

function ProfilePage(){
   return (
      <div>
         <NavBar></NavBar>
         <div className='container_landing-page'>
            <Sidebar/>
            <LandingTeacher/>
         </div>
         
      </div>
   );
}

export default ProfilePage;
