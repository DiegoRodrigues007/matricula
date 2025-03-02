import React, { useState, useEffect } from "react";
import "./ListagemFiltro.css";
import { getAlunosPorCurso } from "../../service/alunoService";
import { Aluno, Curso } from "../../types/ListagemFiltroType";

interface ListagemFiltrosProps {
  cursos: Curso[];
  alunos: Aluno[];
}

const ListagemFiltros: React.FC<ListagemFiltrosProps> = ({
  cursos,
  alunos,
}) => {
  const [selectedCursoId, setSelectedCursoId] = useState<number | "all">("all");
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>(alunos);

  useEffect(() => {
    if (selectedCursoId === "all") {
      setFilteredAlunos(alunos);
    }
  }, [alunos, selectedCursoId]);

  const handleCursoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedCursoId("all");
      setFilteredAlunos(alunos);
    } else {
      const cursoId = parseInt(value, 10);
      setSelectedCursoId(cursoId);
      try {
        const alunosDoCurso = await getAlunosPorCurso(cursoId);
        const mappedAlunos: Aluno[] = alunosDoCurso.map((a) => ({
          ...a,
          cursoId: cursoId,
        }));
        setFilteredAlunos(mappedAlunos);
      } catch (error) {
        console.error("Erro ao buscar alunos por curso:", error);
        setFilteredAlunos([]);
      }
    }
  };

  return (
    <div className="container-listagem-filtros">
      <h1>Listagem e Filtros</h1>

      <section className="secao">
        <h2>Cursos Disponíveis</h2>
        <ul>
          {cursos.map((curso) => (
            <li key={curso.id}>
              <strong>{curso.nome}</strong>: {curso.descricao}
            </li>
          ))}
        </ul>
      </section>

      <section className="secao">
        <h2>Alunos Matriculados</h2>
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno.id}>
              {aluno.nome} - {aluno.email}
            </li>
          ))}
        </ul>
      </section>

      <section className="secao">
        <h2>Alunos de um Determinado Curso</h2>
        <div className="container-selecao">
          <label htmlFor="cursoSelect">Selecione o curso: </label>
          <select
            id="cursoSelect"
            value={selectedCursoId}
            onChange={handleCursoChange}
          >
            <option value="all">Todos os Cursos</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {filteredAlunos.map((aluno) => (
            <li key={aluno.id}>
              {aluno.nome} - {aluno.email}
            </li>
          ))}
          {filteredAlunos.length === 0 && (
            <li>Nenhum aluno encontrado para este curso.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default ListagemFiltros;
