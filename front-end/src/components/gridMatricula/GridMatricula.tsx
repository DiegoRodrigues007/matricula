import React, { useState } from "react";
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./GridMatricula.css";
import { deleteMatricula, updateMatricula } from "../../service/matriculaService";
import { formataDataBR } from "../../utils/formatarDataBr";
import {
  Matricula,
  MatriculaCriarOuAtualizar,
} from "../../types/MatriculaType";

interface GridMatriculaProps {
  matriculas: Matricula[];
  setMatriculas: React.Dispatch<React.SetStateAction<Matricula[]>>;
}

const GridMatricula: React.FC<GridMatriculaProps> = ({
  matriculas,
  setMatriculas,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<
    Partial<MatriculaCriarOuAtualizar>
  >({});
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
        await deleteMatricula(id);
      }
      setMatriculas((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error("Erro ao deletar matrículas em massa:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMatricula(id);
      setMatriculas((prev) => prev.filter((m) => m.id !== id));
      setOpenDropdownId(null);
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } catch (error) {
      console.error(`Erro ao deletar matrícula com id ${id}:`, error);
    }
  };

  const handleEditClick = (mat: Matricula) => {
    setEditingId(mat.id);
    setEditingData({
      aluno: mat.alunoNome,
      nome: mat.cursoNome,
      data: mat.dataMatricula.split("T")[0],
    });
    setOpenDropdownId(null);
  };

  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id: number) => {
    if (!editingData.aluno || !editingData.nome || !editingData.data) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await updateMatricula(id, {
        aluno: editingData.aluno,
        nome: editingData.nome,
        data: editingData.data,
      });

      setMatriculas((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                alunoNome: editingData.aluno!,
                cursoNome: editingData.nome!,
                dataMatricula: editingData.data!,
              }
            : m
        )
      );

      setEditingId(null);
      setEditingData({});
    } catch (error) {
      console.error(`Erro ao atualizar matrícula com id ${id}:`, error);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  return (
    <>
      <div className="tabela-container">
        <table className="tabela-matricula">
          <thead>
            <tr>
              <th></th>
              <th>Aluno</th>
              <th>Curso</th>
              <th>Data da Matrícula</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((mat) => (
              <tr key={mat.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(mat.id)}
                    onChange={() => handleSelectChange(mat.id)}
                  />
                </td>
                {editingId === mat.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="aluno"
                        value={editingData.aluno || ""}
                        onChange={handleEditingChange}
                        className="entrada-edicao"
                      />
                    </td>
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
                        type="date"
                        name="data"
                        value={editingData.data || ""}
                        onChange={handleEditingChange}
                        className="entrada-edicao"
                      />
                    </td>
                    <td className="acoes">
                      <div className="acoes-edicao">
                        <button
                          onClick={() => handleEditSave(mat.id)}
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
                    <td>{mat.alunoNome}</td>
                    <td>{mat.cursoNome}</td>
                    <td>{formataDataBR(mat.dataMatricula)}</td>
                    <td className="acoes">
                      <button
                        className="botao-reticencias"
                        onClick={() => toggleDropdown(mat.id)}
                      >
                        <FaEllipsisV />
                      </button>
                      {openDropdownId === mat.id && (
                        <div className="menu-suspenso">
                          <button
                            onClick={() => handleEditClick(mat)}
                            className="item-menu"
                          >
                            <FaEdit className="icone-menu" /> Editar
                          </button>
                          <button
                            onClick={() => handleDelete(mat.id)}
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
            {matriculas.length === 0 && (
              <tr>
                <td colSpan={5} className="sem-dados">
                  Nenhuma matrícula cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedIds.length > 0 && (
        <div className="acoes-massa">
          <button
            className="botao-deletar-massa"
            onClick={handleBulkDelete}
          >
            Deletar selecionados
          </button>
        </div>
      )}
    </>
  );
};

export default GridMatricula;
