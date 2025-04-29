import { useContext, useState } from "react";
import { ClassContext } from "../../context/ClassContext";
import { Card, Spinner, Button, Table } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";

import './ClassList.css';

function ClassList() {
  const { classes, loading } = useContext(ClassContext);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Mock de estudiantes evaluados (después lo traeremos del backend)
  const studentsEvaluated = [
    {
      id_user: "1",
      name: "Juan Pérez",
      final_score: 85.5,
      risk_name: "Poco probable",
    },
    {
      id_user: "2",
      name: "María Gómez",
      final_score: 65.2,
      risk_name: "Probable",
    },
    {
      id_user: "3",
      name: "Carlos Sánchez",
      final_score: 45.7,
      risk_name: "Muy probable",
    },{
      id_user: "4",
      name: "Juan Pérez",
      final_score: 85.5,
      risk_name: "Poco probable",
    },
    {
      id_user: "5",
      name: "María Gómez",
      final_score: 65.2,
      risk_name: "Probable",
    },
    {
      id_user: "6",
      name: "Carlos Sánchez",
      final_score: 45.7,
      risk_name: "Muy probable",
    },{
      id_user: "7",
      name: "Juan Pérez",
      final_score: 85.5,
      risk_name: "Poco probable",
    },
    {
      id_user: "8",
      name: "María Gómez",
      final_score: 65.2,
      risk_name: "Probable",
    },
    {
      id_user: "9",
      name: "Carlos Sánchez",
      final_score: 45.7,
      risk_name: "Muy probable",
    },{
      id_user: "10",
      name: "Juan Pérez",
      final_score: 85.5,
      risk_name: "Poco probable",
    },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!selectedRoom && classes.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h4>No tienes clases creadas todavía.</h4>
      </div>
    );
  }

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleBackToClassList = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="container mt-4">
      {!selectedRoom ? (
        <div className="row">
          {classes.map((room) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 card-hover-wrapper"
              key={room.id_room}
              onClick={() => handleSelectRoom(room)}
              style={{ cursor: "pointer" }}
            >
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
      ) : (
        <div>
          <Button onClick={handleBackToClassList} className="mb-4 custom-back-button">
            <BsArrowLeft /> Volver a la lista de clases
          </Button>

          <h2 className="mb-4">{selectedRoom.room_grate} "{selectedRoom.secc_room.trim()}" - {selectedRoom.insti_name}</h2>

          <div className="bg-white p-4 shadow rounded">
            {/* Tabla de estudiantes evaluados */}
            <Table striped bordered hover responsive className="evaluated-students-table">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nombre del estudiante</th>
                  <th>Nota final</th>
                  <th>Nivel de riesgo</th>
                </tr>
              </thead>
              <tbody>
                {studentsEvaluated.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center no-students-row">
                    No hay estudiantes evaluados en esta clase.</td>
                  </tr>
                ) : (
                  studentsEvaluated.map((student, index) => (
                    <tr key={student.id_user}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.final_score}</td>
                      <td>{student.risk_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            {/* Mostrar ID de Room (para debugging) */}
            <p className="text-muted">ID de Room: {selectedRoom.id_room}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassList;
