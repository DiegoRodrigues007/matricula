import React, { useEffect, useState } from "react";
import GridMatricula from "../components/gridMatricula/GridMatricula";
import FormMatricula from "../components/formMatricula/FormMatricula";
import { getMatriculas, createMatricula } from "../service/matriculaService";
import { MatriculaFormData, Matricula } from "../types/MatriculaType";
import Alert from "../components/Alert/Alert";

const MatriculaPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMatriculas();
        setMatriculas(data);
      } catch (error) {
        console.error("Erro ao buscar matrículas:", error);
        setAlertMessage("Erro ao carregar matrículas.");
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

  const handleFormSubmit = async (data: MatriculaFormData) => {
    try {
      const novaMatricula = await createMatricula({
        aluno: data.aluno,
        nome: data.nome,
        data: data.data,
      });
      setMatriculas((prev) => [...prev, novaMatricula]);
      setShowForm(false);
      setAlertMessage("Matrícula criada com sucesso!");
      setAlertType("success");
    } catch (error) {
      console.error("Erro ao criar matrícula:", error);
      setAlertMessage("Erro ao criar matrícula. Tente novamente.");
      setAlertType("error");
    }
  };

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1>Página de Matrículas</h1>
      
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
        Nova Matrícula
      </button>

      {showForm && (
        <FormMatricula onSubmit={handleFormSubmit} onCancel={handleCancel} />
      )}

      <GridMatricula matriculas={matriculas} setMatriculas={setMatriculas} />
    </div>
  );
};

export default MatriculaPage;
