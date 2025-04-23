import { useContext } from "react";
import { ClassContext } from "../../context/ClassContext";
import { Card, Spinner } from "react-bootstrap";

function ClassList() {
  const { classes, loading } = useContext(ClassContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h4>No tienes clases creadas todavía.</h4>
      </div>
    );
  }
      
  return (
    <div className="container mt-4">
      <div className="row">
        {classes.map((room) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={room.id_room}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="https://imgs.search.brave.com/ah3L7_0avHxhAByNgWriN5f6W5LbCWTwSDKIcHZ9F-Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZ3VpYWluZmFu/dGlsLmNvbS9tZWRp/YS81MjIzMS9jL2Jp/b2dyYWZpYS1lbi1j/dWVudG8tZGUtbG9z/LWhlcm1hbm9zLWdy/aW1tLXBhcmEtbmlu/b3MtbWFnaWEtYWwt/bmFycmFyLXhzLmpw/Zw"
                alt="Imagen de clase"
              />
              <Card.Body>
                <Card.Title>Grado: {room.secc_room}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{room.insti_name}</Card.Subtitle>
                <Card.Text>Capacidad: {room.max_room} alumnos</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassList;
