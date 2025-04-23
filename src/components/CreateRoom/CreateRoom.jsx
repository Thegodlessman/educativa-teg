import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ClassContext } from "../../context/ClassContext";
import { notifyError, notifySuccess } from "../../utils/notify";

function CreateRoom({ show, handleClose }) {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [section, setSection] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");

  const { addClass } = useContext(ClassContext);

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
  
    const capacity = parseInt(maxCapacity, 10);
    const trimmedSection = section.trim();
    const seccRegex = /^[A-Za-z]+$/;
  
    // Validación de campos vacíos
    if (!selectedInstitution || !trimmedSection || !maxCapacity) {
      notifyError("Por favor, completa todos los campos antes de continuar.");
      return;
    }
  
    // Validación del formato de sección
    if (!seccRegex.test(trimmedSection)) {
      notifyError("La sección solo debe contener letras del abecedario (sin números ni símbolos).");
      return;
    }
  
    // Validación de capacidad máxima
    if (capacity > 50) {
      notifyError("La capacidad máxima permitida por clase es de 50 estudiantes.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) return console.error("Token no encontrado");
  
    try {
      const decodedToken = jwt_decode(token);
      const adminId = decodedToken.id_user;
  
      const response = await axios.post(
        "http://localhost:4555/room/create",
        {
          admin_room: adminId,
          secc_room: trimmedSection,
          id_institution: selectedInstitution,
          max_room: capacity
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.data.success) {
        const nuevaClase = {
          id_room: response.data.id_room,
          secc_room: trimmedSection,
          max_room: capacity,
          insti_name:
            institutions.find((i) => i.id_insti === parseInt(selectedInstitution))?.insti_name || "",
          id_institution: selectedInstitution,
          admin_room: adminId
        };

        notifySuccess("Se ha creado la clase correctamente")
        addClass(nuevaClase);

        setSection("");
        setMaxCapacity("");
        setSelectedInstitution("");

        handleClose();
      }
    } catch (error) {
      notifyError("Ocurrrio un error al crear la clase")
      console.error("Error al crear clase:", error);
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
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                if (/^[A-Za-z]*$/.test(value)) setSection(value);
              }}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Capacidad Máxima de Estudiantes</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ejemplo: 30"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
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
