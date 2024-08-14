import Alert  from "react-bootstrap/Alert";

function AlertExample(){
    return (
        <>
          {/* {[
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'prueba',
            'info',
            'light',
            'dark',
          ].map((variant) => (
            <Alert key={variant} variant={variant}>
              This is a {variant} alert—check it out!
            </Alert>
          ))} */}

            <Alert variant="success">Alerta <Alert.Link href="#" >CULO</Alert.Link> </Alert>
        </>
      );
}

export default AlertExample;