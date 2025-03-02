import api from "./baseApi";
import { Matricula, MatriculaCriarOuAtualizar } from "../types/MatriculaType";

export const getMatriculas = async (): Promise<Matricula[]> => {
  const response = await api.get<Matricula[]>("/Matriculas/BuscaMatricula");
  return response.data;
};

export const createMatricula = async (
  dto: MatriculaCriarOuAtualizar
): Promise<Matricula> => {
  const response = await api.post<Matricula>("/Matriculas/CriaMatricula", dto);
  return response.data;
};

export const updateMatricula = async (
  id: number,
  dto: MatriculaCriarOuAtualizar
): Promise<void> => {
  await api.put(`/Matriculas/AtualizaMatricula?id=${id}`, dto);
};

export const deleteMatricula = async (id: number): Promise<void> => {
  await api.delete(`/Matriculas/DeletaMatricula?id=${id}`);
};
