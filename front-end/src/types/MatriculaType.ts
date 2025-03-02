export interface Matricula {
  id: number;
  alunoNome: string;
  cursoNome: string;
  dataMatricula: string;
}

export interface MatriculaCriarOuAtualizar {
  aluno: string;
  nome: string;
  data: string;
}

export interface MatriculaFormData {
  aluno: string;
  nome: string;
  data: string;
}
