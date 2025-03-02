import React, { useEffect, useState } from "react";
import ListagemFiltros from "../components/listagemFiltro/ListagemFiltro";
import { getCursos } from "../service/cursoService";
import { getAlunos } from "../service/alunoService";
import { AlunoResponse } from "../types/AlunosType";
import { Aluno, Curso } from "../types/ListagemFiltroType";

const ListagemFiltrosPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cursosData = await getCursos();
        setCursos(cursosData);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
      try {
        const alunosData: AlunoResponse[] = await getAlunos("");
        const alunosMapped: Aluno[] = alunosData.map((a) => ({
          id: a.id,
          nome: a.nome,
          email: a.email,
          cursoId: 0,
        }));
        setAlunos(alunosMapped);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="listagem-filtros-page">
      <ListagemFiltros cursos={cursos} alunos={alunos} />
    </div>
  );
};

export default ListagemFiltrosPage;
