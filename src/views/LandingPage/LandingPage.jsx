import NavBar from "../../components/Navbar/Navbar";

function LandingPage(){
    const name ='Educativa';
    return(
        <>
            <NavBar name={name}/>
            <h1>Estas en la vista inicial</h1>
        </>
    )
}

export default LandingPage;