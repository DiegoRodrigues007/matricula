import React, { useState } from "react";
import {
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./GridCurso.css";
import { deleteCurso, updateCurso } from "../../service/cursoService";
import { CursoResponse } from "../../types/CursoType";

interface GridCursoProps {
  cursos: CursoResponse[];
  setCursos: React.Dispatch<React.SetStateAction<CursoResponse[]>>;
}

const GridCurso: React.FC<GridCursoProps> = ({ cursos, setCursos }) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<CursoResponse>>({});
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
        await deleteCurso(id);
      }
      setCursos((prev) =>
        prev.filter((curso) => !selectedIds.includes(curso.id))
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Erro ao deletar cursos em massa:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCurso(id);
      setCursos((prev) => prev.filter((curso) => curso.id !== id));
      setOpenDropdownId(null);
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } catch (error) {
      console.error(`Erro ao deletar o curso com id ${id}:`, error);
    }
  };

  const handleEditClick = (curso: CursoResponse) => {
    setEditingId(curso.id);
    setEditingData(curso);
    setOpenDropdownId(null);
  };

  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id: number) => {
    if (!editingData.nome || !editingData.descricao) {
      console.error("Nome e descrição são obrigatórios para atualizar.");
      return;
    }

    try {
      const updatedCourse: CursoResponse = {
        id,
        nome: editingData.nome,
        descricao: editingData.descricao,
      };

      await updateCurso(updatedCourse);

      setCursos((prev) => prev.map((c) => (c.id === id ? updatedCourse : c)));

      setEditingId(null);
      setEditingData({});
    } catch (error) {
      console.error(`Erro ao atualizar o curso com id ${id}:`, error);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  return (
    <>
      <div className="tabela-container">
        <table className="tabela-curso">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(curso.id)}
                    onChange={() => handleSelectChange(curso.id)}
                  />
                </td>

                {editingId === curso.id ? (
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
                        type="text"
                        name="descricao"
                        value={editingData.descricao || ""}
                        onChange={handleEditingChange}
                        className="entrada-edicao"
                      />
                    </td>
                    <td className="acoes">
                      <div className="acoes-edicao">
                        <button
                          onClick={() => handleEditSave(curso.id)}
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
                    <td>{curso.nome}</td>
                    <td>{curso.descricao}</td>
                    <td className="acoes">
                      <button
                        className="botao-reticencias"
                        onClick={() => toggleDropdown(curso.id)}
                      >
                        <FaEllipsisV />
                      </button>
                      {openDropdownId === curso.id && (
                        <div className="menu-suspenso">
                          <button
                            onClick={() => handleEditClick(curso)}
                            className="item-menu"
                          >
                            <FaEdit className="icone-menu" /> Editar
                          </button>
                          <button
                            onClick={() => handleDelete(curso.id)}
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

            {cursos.length === 0 && (
              <tr>
                <td colSpan={4} className="sem-dados">
                  Nenhum curso cadastrado.
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

export default GridCurso;
