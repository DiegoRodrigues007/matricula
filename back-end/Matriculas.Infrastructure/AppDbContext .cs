using Microsoft.EntityFrameworkCore;
using Matriculas.Domain.Model;

namespace Matriculas.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<AlunoDTO> Alunos { get; set; }
        public DbSet<Curso> Curso { get; set; }
        public DbSet<Matricula> Matriculas { get; set; }

    }
}
