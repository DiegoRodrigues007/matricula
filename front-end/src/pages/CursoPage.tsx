import React, { useState, useEffect } from "react";
import GridCurso from "../components/gridCurso/GridCurso";
import FormCurso from "../components/formCurso/FormCurso";
import { getCursos, createCurso } from "../service/cursoService";
import { CursoResponse, CursoParams } from "../types/CursoType";
import Alert from "../components/Alert/Alert"; 

const CursoPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [cursos, setCursos] = useState<CursoResponse[]>([]);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Iniciando busca de cursos...");
      try {
        const data = await getCursos();
        console.log("Cursos retornados:", data);
        setCursos(data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        setAlertMessage("Erro ao carregar cursos.");
        setAlertType("error");
      }
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (data: { nome: string; descricao: string }) => {
    try {
      const novoCurso = await createCurso(data as CursoParams);
      setCursos((prev) => [...prev, novoCurso]);
      setShowForm(false);

      setAlertMessage("Curso criado com sucesso!");
      setAlertType("success");
    } catch (error) {
      console.error("Erro ao criar curso:", error);

      setAlertMessage("Erro ao criar curso. Tente novamente.");
      setAlertType("error");
    }
  };

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1>Página de Cursos</h1>

      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage("")}
        />
      )}

      <button
        onClick={handleAddClick}
        style={{
          marginBottom: "20px",
          backgroundColor: "#9f7aea",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Adicionar novo curso
      </button>

      {showForm && (
        <FormCurso onSubmit={handleFormSubmit} onCancel={handleCancel} />
      )}

      <GridCurso cursos={cursos} setCursos={setCursos} />
    </div>
  );
};

export default CursoPage;
