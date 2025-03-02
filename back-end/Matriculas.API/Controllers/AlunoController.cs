using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matriculas.Infrastructure;

namespace Matriculas.API.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlunoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("BuscaAluno")]
        public async Task<ActionResult<IEnumerable<AlunoDTO>>> GetAlunos([FromQuery] string nome = null)
        {
            var query = _context.Alunos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(nome))
            {
                query = query.Where(a => a.Nome.Contains(nome));
            }

            var alunos = await query.ToListAsync();

            var alunosDto = alunos.Select(aluno => new AlunoDTO
            {
                Id = aluno.Id,
                Nome = aluno.Nome,
                Email = aluno.Email,
                DataNascimento = aluno.DataNascimento,
                Idade = DateTime.Now.Year - aluno.DataNascimento.Year
            }).ToList();

            return Ok(alunosDto);
        }

        [HttpGet("AlunosPorCurso/{cursoId}")]
        public async Task<ActionResult<IEnumerable<AlunoDTO>>> GetAlunosPorCurso(int cursoId)
        {
            var matriculas = await _context.Matriculas
                .Include(m => m.Aluno)
                .Where(m => m.CursoId == cursoId)
                .ToListAsync();


            var dtos = matriculas.Select(m => new AlunoDTO
            {
                Id = m.Aluno.Id,
                Nome = m.Aluno.Nome,
                Email = m.Aluno.Email,
                DataNascimento = m.Aluno.DataNascimento,
                Idade = DateTime.Now.Year - m.Aluno.DataNascimento.Year
            }).ToList();

            return Ok(dtos);
        }




        [HttpGet("BuscaAlunoId")]
        public async Task<ActionResult<AlunoDTO>> GetAluno(int id)
        {
            var aluno = await _context.Alunos.FindAsync(id);

            if (aluno == null)
                return NotFound();

            return Ok(aluno);
        }

        [HttpPost("CriaNovoAluno")]
        public async Task<ActionResult<AlunoDTO>> CreateAluno([FromBody] AlunoCreateDTO dto)
        {
            var aluno = new AlunoDTO
            {
                Nome = dto.Nome,
                Idade = dto.Idade,
                Email = dto.Email,
                DataNascimento = dto.DataNascimento,
            };

            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();

            var response = new AlunoDTO
            {
                Id = aluno.Id,
                Nome = aluno.Nome,
                Email = aluno.Email,
                Idade = DateTime.Now.Year - aluno.DataNascimento.Year,
                DataNascimento = aluno.DataNascimento
            };

            return CreatedAtAction(nameof(GetAluno), new { id = aluno.Id }, response);
        }


        [HttpPut("AtualizaAluno/{id}")]
        public async Task<IActionResult> UpdateAluno(int id, AlunoDTO aluno)
        {
            if (id != aluno.Id)
                return BadRequest("ID da URL diferente do ID do objeto.");

            _context.Entry(aluno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlunoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("DeletaAluno/{id}")]
        public async Task<IActionResult> DeleteAluno(int id)
        {
            var aluno = await _context.Alunos.FindAsync(id);
            if (aluno == null)
                return NotFound();

            _context.Alunos.Remove(aluno);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlunoExists(int id)
        {
            return _context.Alunos.Any(e => e.Id == id);
        }
    }
}
