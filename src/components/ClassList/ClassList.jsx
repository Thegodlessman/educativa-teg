import { useContext, useState, useEffect } from "react";
import { ClassContext } from "../../context/ClassContext";
import { Card, Spinner, Button, Table } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import './ClassList.css';
import GameTest from '../GameTest/GameTest';
import axios from 'axios';


function ClassList() {
  const { classes, loading, userData } = useContext(ClassContext);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [studentsEvaluated, setStudentsEvaluated] = useState([]);
  const [loadingStudentsTeacherView, setLoadingStudentsTeacherView] = useState(false);

  const [studentTestStatus, setStudentTestStatus] = useState(null);
  const [loadingTestStatusStudentView, setLoadingTestStatusStudentView] = useState(false);
  const [startingTestStudentView, setStartingTestStudentView] = useState(false);

  const [isGameActive, setIsGameActive] = useState(false);
  const [gameProps, setGameProps] = useState(null);


  useEffect(() => {
    if (selectedRoom && userData?.id_user && userData?.rol_name) {
      const { id_room } = selectedRoom;
      const { id_user, rol_name } = userData;

      if (rol_name === "Profesor") {
        setLoadingStudentsTeacherView(true);
        setStudentsEvaluated([])

        axios.get(`${import.meta.env.VITE_BACKEND_URL}test/room/${selectedRoom.id_room}`)
          .then((res) => setStudentsEvaluated(res.data))
          .catch((err) => {
            console.error("Error al cargar estudiantes evaluados:", err);
            setStudentsEvaluated([]);
          })
          .finally(() => setLoadingStudentsTeacherView(false));
      }

      if (rol_name === "Estudiante") {
        setLoadingTestStatusStudentView(true)
        setStudentTestStatus(null)

        const fetchStudentStatus = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}test/status/${id_room}/${id_user}`,
              { headers: { 'Authorization': `Bearer ${token}` } }
            );

            setStudentTestStatus(response.data);

          } catch (error) {
            console.error("Error al cargar el estado de la prueba del estudiante:", error);
            if (error.response && error.response.status === 404) {
              setStudentTestStatus({ isAssigned: false });
            } else if (error.response) {
              const errorMessage = error.response.data?.message || `Error HTTP ${error.response.status}`;
              setStudentTestStatus({ error: errorMessage, isAssigned: false });
            } else {
              setStudentTestStatus({ error: error.message, isAssigned: false });
            }
          } finally {
            setLoadingTestStatusStudentView(false);
          }
        };

        fetchStudentStatus();
      }
    }
  }, [selectedRoom, userData]);

  if (loading || !userData) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
        <span className="ms-2">Cargando clases...</span>
      </div>
    );
  }

  if (!selectedRoom && classes.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        {userData.rol_name === "Profesor" ? (
          <h4>No tienes clases creadas todavía.</h4>
        ) : (
          <h4>No estás unido a ninguna clase todavía.</h4>
        )}
      </div>
    );
  }

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setStudentsEvaluated([]);
    setLoadingStudentsTeacherView(false);
    setStudentTestStatus(null);
    setLoadingTestStatusStudentView(false);
    setStartingTestStudentView(false);
    setIsGameActive(false); 
    setGameProps(null); 
  };

  const handleBackToClassList = () => {
    setSelectedRoom(null);
    setStudentsEvaluated([]);
    setLoadingStudentsTeacherView(false);
    setStudentTestStatus(null);
    setLoadingTestStatusStudentView(false);
    setStartingTestStudentView(false);
    setIsGameActive(false);
    setGameProps(null); 
  };

  const handleStartTestStudent = async () => {
    if (!selectedRoom || !userData?.id_user || startingTestStudentView) {
      console.warn("No se puede iniciar la prueba: condiciones no cumplidas.");
      return;
    }

    setStartingTestStudentView(true); 

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}test/start-student-test`,
        { userId: userData.id_user, roomId: selectedRoom.id_room },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      const testId = response.data.testId; 

      if (!testId) {
        throw new Error("El backend no devolvió un ID de prueba válido.");
      }

      console.log("Prueba iniciada con éxito. ID:", testId);

      setGameProps({ testId: testId, userId: userData.id_user });
      setIsGameActive(true);

    } catch (error) {
      console.error("Error al iniciar la prueba:", error);
      if (error.response) {
        const errorMessage = error.response.data?.message || `Error HTTP ${error.response.status}`;
        alert(`No se pudo iniciar la prueba: ${errorMessage}`);
      } else {
        alert(`No se pudo iniciar la prueba: ${error.message}`);
      }
    } finally {
      setStartingTestStudentView(false); 
    }
  };

  const handleGameEnd = () => {
    console.log("Juego finalizado.");
    setIsGameActive(false); 
    setGameProps(null);
    setSelectedRoom(prev => prev ? { ...prev } : null);
  };

  if (isGameActive && gameProps) {
    return (
      <GameTest
        {...gameProps} 
        onGameEnd={handleGameEnd} 
      />
    );
  }

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
                  src={room.room_url || 'https://via.placeholder.com/200x150?text=Clase'}
                  alt={`Imagen de la clase ${room.room_grate}`}
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
        // Vista: Detalle de Clase Seleccionada
        <div className="fade-in">
          <Button onClick={handleBackToClassList} variant="success" className="mb-4 custom-back-button">
            <BsArrowLeft /> Volver a {userData.rol_name === "Profesor" ? "la lista de clases" : "mis clases"}
          </Button>

          <h2 className="mb-4">{selectedRoom.room_grate} "{selectedRoom.secc_room.trim()}" - {selectedRoom.insti_name}</h2>

          <div className="bg-white p-4 shadow rounded">
            {userData.rol_name === "Profesor" ? (
              // Contenido para Profesor
              <>
                {loadingStudentsTeacherView ? (
                  <div className="text-center">
                    <Spinner animation="border" />
                    <p className="mt-2">Cargando estudiantes evaluados de la clase...</p>
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
                            No hay estudiantes evaluados en esta clase todavía.
                          </td>
                        </tr>
                      ) : (
                        studentsEvaluated.map((student, index) => (
                          <tr key={student.id_user || `student-${index}`}>
                            <td>{index + 1}</td>
                            <td>{student.user_name || student.student_name || 'Nombre no disponible'}</td>
                            <td>
                              {student.final_score !== null && student.final_score !== undefined
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
              </>

            ) : userData.rol_name === "Estudiante" ? (
              // Contenido para Estudiante
              <>
                {loadingTestStatusStudentView ? (
                  <div className="text-center">
                    <Spinner animation="border" />
                    <p className="mt-2">Verificando el estado de tu prueba para esta clase...</p>
                  </div>
                ) : studentTestStatus?.error ? (
                  <div className="text-center text-danger">
                    <p>Error al cargar el estado de tu prueba: {studentTestStatus.error}</p>
                    <Button variant="outline-danger" onClick={() => handleSelectRoom(selectedRoom)}>Intentar de nuevo</Button>
                  </div>
                ) : studentTestStatus?.isCompleted ? (
                  <div className="text-center text-success">
                    <h4>¡Tu prueba de TDAH para esta clase ha sido completada!</h4>
                    {studentTestStatus.finalScore !== undefined && studentTestStatus.finalScore !== null &&
                      <p>Tu puntuación final: {studentTestStatus.finalScore}</p>
                    }
                    {studentTestStatus.riskName &&
                      <p>Nivel de riesgo: {studentTestStatus.riskName}</p>
                    }
                    <p className="text-muted mt-3">Puedes revisar tus resultados detallados con tu profesor.</p>
                  </div>
                ) : studentTestStatus?.isAssigned === false ? (
                  <div className="text-center text-info">
                    <h4>No hay una prueba de TDAH asignada para ti en esta clase en este momento.</h4>
                    <p className="text-muted mt-3">Consulta con tu profesor si esperas una prueba.</p>
                  </div>
                ) : (
                  // Prueba Asignada y Pendiente: Mostrar botón de inicio
                  <div className="text-center">
                    <h4>Tienes una prueba de TDAH pendiente para esta clase.</h4>

                    <Button
                      variant="primary"
                      onClick={handleStartTestStudent} // Enlaza el manejador aquí
                      disabled={startingTestStudentView}
                      className="mt-3"
                    >
                      {startingTestStudentView ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                      {startingTestStudentView ? 'Iniciando prueba...' : 'Iniciar Prueba'}
                    </Button>
                    <p className="text-muted mt-3">Haz clic para comenzar cuando estés listo.</p>
                  </div>
                )}
              </>

            ) : (
              // Contenido para Rol Desconocido
              <div className="text-center text-danger">
                <h4>No se pudo cargar la información de la clase. Rol de usuario desconocido.</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassList;