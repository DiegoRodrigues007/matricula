import React, { useState } from "react";
import "./FormCurso.css";
import { CursoParams } from "../../types/CursoType";

interface AddCursoFormProps {
  onSubmit: (data: CursoParams) => void;
  onCancel: () => void;
}

const FormCurso: React.FC<AddCursoFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CursoParams>({
    nome: "",
    descricao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nome: "", descricao: "" });
  };

  return (
    <form className="formulario-curso" onSubmit={handleSubmit}>
      <h2>Novo Curso</h2>

      <div className="grupo-campo">
        <label htmlFor="nome">Nome *</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grupo-campo">
        <label htmlFor="descricao">Descrição *</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={formData.descricao}
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

export default FormCurso;
