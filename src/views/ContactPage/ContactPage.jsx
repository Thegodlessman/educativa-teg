import NavBar from "../../components/Navbar/Navbar";

function ContactPage(){
    const name ='Contacto';
    return(
        <>
            <NavBar name={name}/>
            <h1>Estas en la vista contacto</h1>
        </>
    )
}

export default ContactPage;