import jwt_decode from 'jwt-decode'

const token = localStorage.getItem('token');
const decodedToken = jwt_decode(token);
const user_fullname = decodedToken.full_name;
const rol = decodedToken.rol;

function ProfileLanding(){
    return(
        <>
            <h1>{user_fullname}</h1>
            <h2>{rol}</h2>

        </>
    )
}

export default ProfileLanding;