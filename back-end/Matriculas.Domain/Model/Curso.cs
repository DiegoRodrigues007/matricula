namespace Matriculas.Domain.Model
{
    public class Curso
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
    }
    public class CreateCursoDTO
    {
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
    }
}
