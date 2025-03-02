import api from "./baseApi";
import { AlunoResponse, AlunoParams } from "../types/AlunosType";

export const getAlunos = async (nome?: string): Promise<AlunoResponse[]> => {
  const endpoint = nome
    ? `/Aluno/BuscaAluno?nome=${nome}`
    : `/Aluno/BuscaAluno?nome=`;
  const response = await api.get<AlunoResponse[]>(endpoint);
  return response.data;
};

export const getAlunosPorCurso = async (
  cursoId: number
): Promise<AlunoResponse[]> => {
  const response = await api.get<AlunoResponse[]>(
    `/Aluno/AlunosPorCurso/${cursoId}`
  );
  return response.data;
};

export const createAluno = async (
  data: AlunoParams
): Promise<AlunoResponse> => {
  const response = await api.post<AlunoResponse>("/Aluno/CriaNovoAluno", data);
  return response.data;
};

export const updateAluno = async (
  id: number,
  data: Partial<AlunoParams>
): Promise<void> => {
  console.log(`Tentando atualizar o aluno com id: ${id}`, data);
  try {
    const response = await api.put(`/Aluno/AtualizaAluno/${id}`, data);
    console.log(
      `Resposta do backend ao atualizar o aluno com id ${id}:`,
      response
    );
  } catch (error) {
    console.error(`Erro ao atualizar o aluno com id ${id}:`, error);
    throw error;
  }
};

export const deleteAluno = async (id: number): Promise<void> => {
  console.log(`Tentando deletar o aluno com id: ${id}`);
  try {
    const response = await api.delete(`/Aluno/DeletaAluno/${id}`);
    console.log(
      `Resposta do backend ao deletar o aluno com id ${id}:`,
      response
    );
  } catch (error) {
    console.error(`Erro ao deletar o aluno com id ${id}:`, error);
    throw error;
  }
};
