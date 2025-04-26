import { useContext } from "react";
import { ClassContext } from "../../context/ClassContext";
import { Card, Spinner } from "react-bootstrap";

import './ClassList.css'

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
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 card-hover-wrapper" key={room.id_room}>
            <Card className="h-100 shadow-sm card-hover">
              <Card.Img
                variant="top"
                src={room.room_url}
                alt="Imagen de clase"
              />
              <Card.Body>
                <Card.Title>{room.room_grate} "{room.secc_room.trim()}"</Card.Title>
                <Card.Subtitle>{room.code_room}</Card.Subtitle>
                <Card.Subtitle className="mt-1 text-muted">{room.insti_name}</Card.Subtitle>
                <Card.Text className="text-muted">{room.max_room} alumnos</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassList;
