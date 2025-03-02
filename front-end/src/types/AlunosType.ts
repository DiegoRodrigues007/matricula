export interface AlunoResponse {
  id: number;
  nome: string;
  email: string;
  idade: number;
  dataNascimento: string;
}

export interface AlunoParams {
  email: string;
  nome: string;
  idade: number;
  dataNascimento: string;
}

export interface AlunoFormData {
  name: string;
  email: string;
  dataNascimento: string;
}
