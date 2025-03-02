namespace Matriculas.Domain.Model
{
    public class Matricula
    {
        public int Id { get; set; }
        public int AlunoId { get; set; }
        public AlunoDTO? Aluno { get; set; }
        public int CursoId { get; set; }
        public Curso? Curso { get; set; }
        public DateTime DataMatricula { get; set; } = DateTime.Now;
    }

    public class CreateMatriculaDTO
    {
        public string? Nome { get; set; }   
        public string? Aluno { get; set; }  
        public DateTime Data { get; set; } 
    }

    public class MatriculaResponseDTO
    {
        public int Id { get; set; }
        public string? AlunoNome { get; set; }
        public string? CursoNome { get; set; }
        public DateTime DataMatricula { get; set; }
    }
}
