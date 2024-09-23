import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {HomeOutlined, SettingOutlined} from '@ant-design/icons';
import jwt_decode from 'jwt-decode'

import './ProfileNav.css'

const {Sider} = Layout;

function ProfileNav(){
    const [isOpen, setIsOpen] = useState(true);
    const [isLogout, setIsLoguot] = useState(false);

    let token = localStorage.getItem('token');
    let decodedToken = jwt_decode(token);
    const user_fullname = decodedToken.full_name;
    let rol = decodedToken.rol;

    if(rol === 'Usuario'){
        token = localStorage.getItem('token')
        decodedToken = jwt_decode(token)
        rol = decodedToken.rol;
    }

    const toggleSidebar = () =>{
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Layout>
                <Sider className='sidebar-container_profile'>
                    <div className='fs-3 fw-bolder text-decoration-none me-5 ms-4 sidebar-logo'  href="/">
                        <img className="me-1" src='../../../src/assets/logo.png' width="50" height="50"/>
                        Educativa
                    </div>
                    <Menu theme='dark' mode='inline' className='sidebar-menu_profile'>
                    
                        <button><HomeOutlined/>Home</button>

                        
                    </Menu>

                    <div className="sidebar-account_profile" >
                            <div className="sidebar-img_profile">
                                <img src='https://thumbs.dreamstime.com/z/s%C3%ADmbolo-de-perfil-masculino-inteligente-retrato-estilo-caricatura-m%C3%ADnimo-166146967.jpg' alt='Imagen de perfil'></img>
                            </div>

                            <div className="sidebar-details_profile">
                                <p className="sidebar-username_profile"> {user_fullname}
                                <p className="sidebar-rol_profile">{rol}</p>
                                </p>
                            </div>

                            
                    </div>
                </Sider>

            </Layout>
        </>
    )
}

export default ProfileNav;