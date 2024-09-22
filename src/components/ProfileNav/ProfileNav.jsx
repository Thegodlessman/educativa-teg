import React, {useState} from 'react';
import jwt_decode from 'jwt-decode'

import './ProfileNav.css'

function ProfileNav(){
    const [isOpen, setIsOpen] = useState(false);

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
            <div className={`sidebar-container_profile ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar_profile" onClick={toggleSidebar}>
                    {isOpen ? (  // Solo mostrar contenido cuando esté abierto
                        <div className="sidebar-header_profile" >
                            <div className="sidebar-img_profile">
                                <img src='https://thumbs.dreamstime.com/z/s%C3%ADmbolo-de-perfil-masculino-inteligente-retrato-estilo-caricatura-m%C3%ADnimo-166146967.jpg' alt='Imagen de perfil'></img>
                            </div>

                            <div className="sidebar-details_profile">
                                <p className="sidebar-username_profile"> {user_fullname}</p>
                                <p className="sidebar-rol_profile">{rol}</p>
                            </div>
                        </div>
                    ) : (
                        /* HTML cuando el sidebar está cerrado */
                            <div className="sidebar-header_profile">
                                <div className="sidebar-img_profile">
                                    <img 
                                        src='https://thumbs.dreamstime.com/z/s%C3%ADmbolo-de-perfil-masculino-inteligente-retrato-estilo-caricatura-m%C3%ADnimo-166146967.jpg' 
                                        alt='Imagen de perfil'
                                    />
                                </div>
                            </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfileNav;