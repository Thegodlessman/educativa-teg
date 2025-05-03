import { useContext, useState, useEffect } from "react";
import { ClassContext } from "../../context/ClassContext";
import { Card, Spinner, Button, Table } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import './ClassList.css';

function ClassList() {
  const { classes, loading } = useContext(ClassContext);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [studentsEvaluated, setStudentsEvaluated] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    if (selectedRoom) {
      setLoadingStudents(true);

      fetch(`${import.meta.env.VITE_BACKEND_URL}test/room/${selectedRoom.id_room}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener estudiantes");
          return res.json();
        })
        .then((data) => setStudentsEvaluated(data))
        .catch((err) => {
          console.error("Error al cargar estudiantes evaluados:", err);
          setStudentsEvaluated([]);
        })
        .finally(() => setLoadingStudents(false));
    }
  }, [selectedRoom]);

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
    setStudentsEvaluated([]);
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
        <div className="fade-in">
          <Button onClick={handleBackToClassList} variant="success" className="mb-4 custom-back-button">
            <BsArrowLeft /> Volver a la lista de clases
          </Button>

          <h2 className="mb-4">{selectedRoom.room_grate} "{selectedRoom.secc_room.trim()}" - {selectedRoom.insti_name}</h2>

          <div className="bg-white p-4 shadow rounded">
            {loadingStudents ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : (
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
                        No hay estudiantes evaluados en esta clase.
                      </td>
                    </tr>
                  ) : (
                    studentsEvaluated.map((student, index) => (
                      <tr key={student.id_user}>
                        <td>{index + 1}</td>
                        <td>{student.student_name}</td>
                        <td>
                          {student.final_score !== null
                            ? student.final_score
                            : <span className="not-test">Prueba pendiente</span>}
                        </td>
                        <td>
                          {student.risk_name || <span className="text-muted">—</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}

            <p className="text-muted">ID de Room: {selectedRoom.id_room}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassList;
