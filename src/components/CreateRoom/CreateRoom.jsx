import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";

function CreateRoom({ show, handleClose }) {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [section, setSection] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const decodedToken = jwt_decode(token);
        const response = await axios.post(
          "http://localhost:4555/room/insti",
          { id_user: decodedToken.id_user },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setInstitutions(response.data.insti);
        } else {
          console.error("Error al obtener instituciones", response.data);
        }
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    if (show) fetchInstitutions();
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return console.error("Token no encontrado");

    try {
      const decodedToken = jwt_decode(token);
      const adminId = decodedToken.id_user;

      const response = await axios.post(
        "http://localhost:4555/room/create",
        { admin_room: adminId,
          secc_room: section,
          id_institution: selectedInstitution,
          max_room: parseInt(maxCapacity, 10)
          },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      handleClose();
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Crear Clase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Escuela</Form.Label>
            <Form.Select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              required
            >
              <option value="">Seleccionar institución</option>
              {institutions.length > 0 ? (
                institutions.map((inst) => (
                  <option key={inst.id_insti} value={inst.id_insti}>
                    {inst.insti_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>Cargando instituciones...</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Sección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: A, B, C..."
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Capacidad Máxima de Estudiantes</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ejemplo: 30"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              required
              min={1}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3 w-100">
            Crear
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateRoom;
