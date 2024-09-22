import jwt_decode from 'jwt-decode'

function ProfileNav(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const user_fullname = decodedToken.full_name;
    const rol = decodedToken.rol;

    return (
        <>
            <h1>hola</h1>
            <div className="sidebar-container_profile">
                <div className="sidebar_profile">
                    <div className="sidebar-header_profile">

                        <div className="sidebar-img_profile">
                            <img src='' alt='Imagen de perfil'></img>
                        </div>

                        <div className="sidebar-details_profile">
                            <p className="sidebar-rol_profile"> {rol}</p>
                            <p className="sidebar-username_profile"> {user_fullname}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileNav;