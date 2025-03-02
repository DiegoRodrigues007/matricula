export interface Curso {
  id: number;
  nome: string;
  descricao: string;
}

export interface Aluno {
  id: number;
  nome: string;
  email: string;
  cursoId: number;
}
