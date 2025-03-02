import React, { useState } from "react";
import "./FormAluno.css";
import { AlunoFormData } from "../../types/AlunosType";

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

interface FormAlunoProps {
  onSubmit: (data: AlunoFormData) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

const FormAluno: React.FC<FormAlunoProps> = ({ onSubmit, onCancel, onError }) => {
  const [formData, setFormData] = useState<AlunoFormData>({
    name: "",
    email: "",
    dataNascimento: "",
  });

  const age = formData.dataNascimento ? calculateAge(formData.dataNascimento) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof age === "number" && age < 18) {
      onError("O aluno deve ter pelo menos 18 anos.");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", email: "", dataNascimento: "" });
  };

  return (
    <form className="formulario-aluno" onSubmit={handleSubmit}>
      <h2>Novo Aluno</h2>

      <div className="grupo-campo">
        <label htmlFor="name">Nome *</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grupo-campo">
        <label htmlFor="email">E-mail *</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grupo-campo">
        <label htmlFor="dataNascimento">Data de Nascimento *</label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grupo-campo">
        <label>Idade</label>
        <input
          type="text"
          value={formData.dataNascimento ? age : ""}
          readOnly
          placeholder="Preenchida automaticamente"
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

export default FormAluno;
