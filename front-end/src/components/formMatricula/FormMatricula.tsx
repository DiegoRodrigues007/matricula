import React, { useState } from "react";
import "./FormMatricula.css";
import { MatriculaFormData } from "../../types/MatriculaType";

interface FormMatriculaProps {
  onSubmit: (data: MatriculaFormData) => void;
  onCancel: () => void;
}

const FormMatricula: React.FC<FormMatriculaProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<MatriculaFormData>({
    aluno: "",
    nome: "",
    data: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ aluno: "", nome: "", data: "" });
  };

  return (
    <form className="formulario-matricula" onSubmit={handleSubmit}>
      <h2>Nova Matrícula</h2>

      <div className="grupo-campo">
        <label htmlFor="aluno">Nome do Aluno *</label>
        <input
          type="text"
          id="aluno"
          name="aluno"
          placeholder="Ex.: João Silva"
          value={formData.aluno}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grupo-campo">
        <label htmlFor="nome">Nome do Curso *</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Ex.: React Básico"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grupo-campo">
        <label htmlFor="data">Data da Matrícula *</label>
        <input
          type="date"
          id="data"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />
      </div>

      <div className="botoes-formulario">
        <button type="submit" className="botao-adicionar">
          Adicionar
        </button>
        <button type="button" className="botao-cancelar" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormMatricula;
