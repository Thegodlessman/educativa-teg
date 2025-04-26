import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import logo from "../../../src/assets/logo.png";
import { notifyError } from "../../utils/notify";
import "./SelectRole.css";

const teacherRole =
  import.meta.env.VITE_CLOUDNARY_IMAGE + "educativa/TeacherRole";
const studentRole =
  import.meta.env.VITE_CLOUDNARY_IMAGE + "educativa/StudentRole";

function SelectRole({ show, handleClose, handleRoleChange }) {
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    if (show) {
      fetchRoles();
      fetchInstitutions();
      setStep(1);
    }
  }, [show]);

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4555/profile/get/institutions"
      );
      setInstitutions(response.data.institutions);
    } catch (error) {
      notifyError("Error al cargar las instituciones");
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserData(decoded);
      } catch (e) {
        console.error("Error decoding token", e);
      }
    }
  }, []);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4555/profile/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allowedRoles = response.data.roles.filter(
        (role) => role.rol_name === "Estudiante" || role.rol_name === "Profesor"
      );
      setRoles(allowedRoles);
    } catch (error) {
      notifyError(
        "Error al obtener los roles:",
        error.response?.data || error.message
      );
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleFinish = async () => {
    try {
      const formData = new FormData();
      formData.append("institution", selectedInstitution);
      if (selectedImage) {
        formData.append("photo", selectedImage);
      }

      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:4555/users/setup/${userData.id_user}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      notifySuccess("Perfil completado exitosamente");
      handleClose();
    } catch (err) {
      notifyError("Error al guardar la información");
    }
  };

  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="fixed-size-modal"
    >
      <div className="modal-container_Role">
        <div className="modal-custom-header">
          <img src={logo} width="80" height="80" alt="Logo Educativa" />
          <h4 className="mt-1 logo-title">Educativa</h4>
        </div>

        <Modal.Body
          className="text-center d-flex flex-column"
          style={{ flex: 1, height: "100%" }}
        >
          <div className="modal-body-content flex-grow-1 overflow-auto px-2">
            {step === 1 && (
              <>
                <h5>Selecciona tu rol</h5>
                <div className="d-flex justify-content-around mt-4">
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <div
                        key={role.id_rol}
                        className={`role-selection ${selectedRole === role.rol_name ? "selected-role" : ""
                          }`}
                        onClick={() => setSelectedRole(role.rol_name)}
                      >
                        <img
                          src={
                            role.rol_name === "Estudiante"
                              ? studentRole
                              : teacherRole
                          }
                          className="role-image"
                          alt={role.rol_name}
                          width={100}
                          height={100}
                        />
                        <span>{role.rol_name}</span>
                      </div>
                    ))
                  ) : (
                    <p>No hay roles disponibles</p>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h5>Selecciona tu institución</h5>
                <div className="form-group mt-4">
                  <select
                    className="form-select"
                    value={selectedInstitution || ""}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                  >
                    <option value="" disabled>
                      -- Selecciona una institución --
                    </option>
                    {institutions.map((inst) => (
                      <option key={inst.id_insti} value={inst.id_insti}>
                        {inst.insti_name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h5>
                  ¡Sube una foto de perfil!{" "}
                  <span style={{ fontSize: "14px", color: "#888" }}>
                    (opcional)
                  </span>
                </h5>

                <div className="image-upload mt-4">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="preview-img"
                    />
                  ) : (
                    <label htmlFor="file-upload" className="upload-placeholder">
                      Seleccionar imagen
                    </label>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setSelectedImage(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPreviewUrl(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h4 className="mb-2">¡Tu perfil está casi listo!</h4>
                <div className="user-summary-card">
                  <img
                    src={userData.user_url}
                    alt="Foto de perfil"
                    className="summary-img"
                  />
                  <div className="summary-info">
                    <p>
                      <strong>Nombre:</strong> {userData.full_name}
                    </p>
                    <p>
                      <strong>Rol:</strong> {selectedRole}
                    </p>
                    <p>
                      <strong>Institución: </strong>
                      {institutions.find(
                        (inst) => inst.id_insti === selectedInstitution
                      )?.insti_name || "Sin nombre"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Botonera fija al fondo */}
          <div className="d-flex justify-content-between mt-4">
            {step > 1 && (
              <button className="btn-back" onClick={handleBack}>
                Atrás
              </button>
            )}
            {step < 4 && (
              <button
                className="btn-next ms-auto"
                disabled={
                  (step === 1 && !selectedRole) ||
                  (step === 2 && !selectedInstitution)
                }
                onClick={handleNext}
              >
                Siguiente
              </button>
            )}
            {step === 4 && (
              <button className="btn-finish ms-auto" onClick={handleFinish}>
                Confirmar y continuar
              </button>
            )}
          </div>
        </Modal.Body>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

    </Modal>
  );
}

export default SelectRole;
