import api from "./baseApi";
import { CursoParams, CursoResponse } from "../types/CursoType";

export const getCursos = async (): Promise<CursoResponse[]> => {
  const response = await api.get<CursoResponse[]>("/Curso/BuscaCurso");
  return response.data;
};

export const createCurso = async (
  curso: CursoParams
): Promise<CursoResponse> => {
  const response = await api.post<CursoResponse>("/Curso/CriaCurso", curso);
  return response.data;
};

export const updateCurso = async (curso: CursoResponse): Promise<void> => {
  await api.put(`/Curso/AtualizaCurso?id=${curso.id}`, curso);
};

export const deleteCurso = async (id: number): Promise<void> => {
  await api.delete(`/Curso/DeletaCurso?id=${id}`);
};
