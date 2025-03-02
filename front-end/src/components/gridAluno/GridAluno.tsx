import React, { useState } from "react";
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./GridAluno.css";
import { deleteAluno, updateAluno } from "../../service/alunoService";
import { AlunoResponse } from "../../types/AlunosType";
import { formataDataBR, formataDataISO } from "../../utils/formatarDataBr";

function getInitials(nome: string = ""): string {
  const partes = nome.trim().split(" ");
  if (partes.length === 1) {
    return partes[0].charAt(0).toUpperCase();
  }
  const primeiraLetra = partes[0].charAt(0);
  const ultimaLetra = partes[partes.length - 1].charAt(0);
  return (primeiraLetra + ultimaLetra).toUpperCase();
}

interface GridAlunoProps {
  alunos: AlunoResponse[];
  setAlunos: React.Dispatch<React.SetStateAction<AlunoResponse[]>>;
}

const GridAluno: React.FC<GridAlunoProps> = ({ alunos, setAlunos }) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<AlunoResponse>>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleSelectChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedIds) {
        await deleteAluno(id);
      }
      setAlunos((prev) =>
        prev.filter((aluno) => !selectedIds.includes(aluno.id))
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Erro ao deletar alunos em massa:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAluno(id);
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
      setOpenDropdownId(null);
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } catch (error) {
      console.error(`Erro ao deletar o aluno com id ${id}:`, error);
    }
  };

  const handleEditClick = (aluno: AlunoResponse) => {
    setEditingId(aluno.id);
    setEditingData(aluno);
    setOpenDropdownId(null);
  };

  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (editingId === null) return;
    try {
      const updatedIdade = editingData.dataNascimento
        ? new Date().getFullYear() -
          new Date(editingData.dataNascimento).getFullYear()
        : alunos.find((a) => a.id === editingId)?.idade || 0;

      const dataToUpdate = {
        id: editingId,
        nome: editingData.nome,
        email: editingData.email,
        dataNascimento: editingData.dataNascimento,
        idade: updatedIdade,
      };

      await updateAluno(editingId, dataToUpdate);

      setAlunos((prev) =>
        prev.map((aluno) =>
          aluno.id === editingId
            ? {
                ...aluno,
                nome: editingData.nome ?? aluno.nome,
                email: editingData.email ?? aluno.email,
                dataNascimento:
                  editingData.dataNascimento ?? aluno.dataNascimento,
                idade: updatedIdade,
              }
            : aluno
        )
      );
      setEditingId(null);
      setEditingData({});
    } catch (error) {
      console.error(`Erro ao atualizar aluno com id ${editingId}:`, error);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  return (
    <>
      <div className="tabela-container">
        <table className="tabela-aluno">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idade</th>
              <th>Data de Nascimento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(aluno.id)}
                    onChange={() => handleSelectChange(aluno.id)}
                  />
                </td>

                {editingId === aluno.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="nome"
                        value={editingData.nome || ""}
                        onChange={handleEditingChange}
                        className="entrada-edicao"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editingData.email || ""}
                        onChange={handleEditingChange}
                        className="entrada-edicao"
                      />
                    </td>
                    <td>
                      {editingData.dataNascimento
                        ? new Date().getFullYear() -
                          new Date(editingData.dataNascimento).getFullYear()
                        : aluno.idade}
                    </td>
                    <td>
                      <input
                        type="date"
                        name="dataNascimento"
                        value={formataDataISO(editingData.dataNascimento)}
                        onChange={handleEditingChange}
                        className="entrada-edicao"
                      />
                    </td>
                    <td className="acoes">
                      <div className="acoes-edicao">
                        <button
                          onClick={handleEditSave}
                          className="botao-icone botao-salvar"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="botao-icone botao-cancelar"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <div className="info-usuario">
                        <div className="iniciais">
                          {getInitials(aluno.nome)}
                        </div>
                        <span className="nome">{aluno.nome}</span>
                      </div>
                    </td>
                    <td>{aluno.email}</td>
                    <td>{aluno.idade}</td>
                    <td>{formataDataBR(aluno.dataNascimento)}</td>
                    <td className="acoes">
                      <button
                        className="botao-reticencias"
                        onClick={() => toggleDropdown(aluno.id)}
                      >
                        <FaEllipsisV />
                      </button>
                      {openDropdownId === aluno.id && (
                        <div className="menu-suspenso">
                          <button
                            onClick={() => handleEditClick(aluno)}
                            className="item-menu"
                          >
                            <FaEdit className="icone-menu" /> Editar
                          </button>
                          <button
                            onClick={() => handleDelete(aluno.id)}
                            className="item-menu"
                          >
                            <FaTrash className="icone-menu" /> Deletar
                          </button>
                        </div>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}

            {alunos.length === 0 && (
              <tr>
                <td colSpan={6} className="sem-dados">
                  Nenhum aluno cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedIds.length > 0 && (
        <div className="acoes-massa">
          <button className="botao-deletar-massa" onClick={handleBulkDelete}>
            Deletar selecionados
          </button>
        </div>
      )}
    </>
  );
};

export default GridAluno;
