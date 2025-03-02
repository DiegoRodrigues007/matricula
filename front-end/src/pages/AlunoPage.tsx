import React, { useState, useEffect } from "react";
import GridAluno from "../components/gridAluno/GridAluno";
import FormAluno from "../components/formAluno/FormAluno";
import Alert from "../components/Alert/Alert";
import { getAlunos, createAluno } from "../service/alunoService";
import { AlunoResponse } from "../types/AlunosType";
import { AlunoFormData } from "../types/AlunosType";

const mapServiceAlunoToGridAluno = (aluno: AlunoResponse): AlunoResponse => ({
  ...aluno,
});

const AlunoPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [alunos, setAlunos] = useState<AlunoResponse[]>([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">(
    "info"
  );

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const data: AlunoResponse[] = await getAlunos("");
        const mappedAlunos = data.map(mapServiceAlunoToGridAluno);
        setAlunos(mappedAlunos);
      } catch (error) {
        console.error(error);
        setAlertMessage("Erro ao carregar alunos.");
        setAlertType("error");
      }
    };
    fetchAlunos();
  }, []);

  const calculateAge = (birthDateStr: string): number => {
    const today = new Date();
    const birthDate = new Date(birthDateStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (data: AlunoFormData) => {
    const age = calculateAge(data.dataNascimento);
    if (age < 18) {
      setAlertMessage("O aluno deve ter pelo menos 18 anos.");
      setAlertType("error");
      return;
    }

    try {
      const serviceAluno: AlunoResponse = await createAluno({
        nome: data.name,
        dataNascimento: data.dataNascimento,
        email: data.email,
        idade: age,
      });
      const newAluno = mapServiceAlunoToGridAluno(serviceAluno);
      setAlunos((prev) => [...prev, newAluno]);
      setShowForm(false);
      setAlertMessage("Aluno adicionado com sucesso!");
      setAlertType("success");
    } catch (error) {
      console.error(error);
      setAlertMessage("Erro ao criar aluno. Tente novamente.");
      setAlertType("error");
    }
  };

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1>Página de Alunos</h1>
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
        }}
      >
        Adicionar novo aluno
      </button>
      {showForm && (
        <FormAluno
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          onError={(msg) => {
            setAlertMessage(msg);
            setAlertType("error");
          }}
        />
      )}
      <GridAluno alunos={alunos} setAlunos={setAlunos} />
    </div>
  );
};

export default AlunoPage;
