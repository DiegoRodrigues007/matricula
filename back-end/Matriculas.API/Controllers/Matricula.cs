using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matriculas.Infrastructure;
using Matriculas.Domain.Model;

namespace Matriculas.API.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class MatriculasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MatriculasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("BuscaMatricula")]
        public async Task<ActionResult<IEnumerable<MatriculaResponseDTO>>> GetMatriculas()
        {
            var matriculas = await _context.Matriculas
                .Include(m => m.Aluno)
                .Include(m => m.Curso)
                .ToListAsync();

            var dtos = matriculas.Select(m => new MatriculaResponseDTO
            {
                Id = m.Id,
                DataMatricula = m.DataMatricula,
                AlunoNome = m.Aluno.Nome,
                CursoNome = m.Curso.Nome
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("BuscaMatriculaId")]
        public async Task<ActionResult<Matricula>> GetMatricula(int id)
        {
            var matricula = await _context.Matriculas
                .Include(m => m.Aluno)
                .Include(m => m.Curso)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (matricula == null)
                return NotFound();

            return Ok(matricula);
        }

        [HttpPost("CriaMatricula")]
        public async Task<ActionResult<MatriculaResponseDTO>> CreateMatricula([FromBody] CreateMatriculaDTO dto)
        {
            var aluno = await _context.Alunos.FirstOrDefaultAsync(a => a.Nome == dto.Aluno);
            if (aluno == null) return BadRequest("Aluno não encontrado.");

            var curso = await _context.Curso.FirstOrDefaultAsync(c => c.Nome == dto.Nome);
            if (curso == null) return BadRequest("Curso não encontrado.");

            var novaMatricula = new Matricula
            {
                AlunoId = aluno.Id,
                CursoId = curso.Id,
                DataMatricula = dto.Data
            };

            _context.Matriculas.Add(novaMatricula);
            await _context.SaveChangesAsync();

            var responseDto = new MatriculaResponseDTO
            {
                Id = novaMatricula.Id,
                AlunoNome = aluno.Nome,
                CursoNome = curso.Nome,
                DataMatricula = novaMatricula.DataMatricula
            };

            return CreatedAtAction(nameof(GetMatricula), new { id = novaMatricula.Id }, responseDto);
        }

        [HttpPut("AtualizaMatricula")]
        public async Task<ActionResult<MatriculaResponseDTO>> UpdateMatricula([FromQuery] int id, [FromBody] CreateMatriculaDTO dto)
        {
            var matricula = await _context.Matriculas.FindAsync(id);
            if (matricula == null)
                return NotFound("Matrícula não encontrada.");

            var aluno = await _context.Alunos.FirstOrDefaultAsync(a => a.Nome == dto.Aluno);
            if (aluno == null) return BadRequest("Aluno não encontrado.");

            var curso = await _context.Curso.FirstOrDefaultAsync(c => c.Nome == dto.Nome);
            if (curso == null) return BadRequest("Curso não encontrado.");

            matricula.AlunoId = aluno.Id;
            matricula.CursoId = curso.Id;
            matricula.DataMatricula = dto.Data;

            _context.Entry(matricula).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var responseDto = new MatriculaResponseDTO
            {
                Id = matricula.Id,
                AlunoNome = aluno.Nome,
                CursoNome = curso.Nome,
                DataMatricula = matricula.DataMatricula
            };

            return Ok(responseDto);
        }

        [HttpDelete("DeletaMatricula")]
        public async Task<IActionResult> DeleteMatricula([FromQuery] int id)
        {
            var matricula = await _context.Matriculas.FindAsync(id);
            if (matricula == null)
                return NotFound();

            _context.Matriculas.Remove(matricula);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("MatricularVarios")]
        public async Task<IActionResult> MatricularVarios(int alunoId, [FromBody] List<int> cursosIds)
        {
            var aluno = await _context.Alunos.FindAsync(alunoId);
            if (aluno == null) return NotFound("Aluno não encontrado.");

            foreach (var cursoId in cursosIds)
            {
                var curso = await _context.Curso.FindAsync(cursoId);
                if (curso == null) continue;

                var matricula = new Matricula
                {
                    AlunoId = alunoId,
                    CursoId = cursoId,
                    DataMatricula = DateTime.Now
                };
                _context.Matriculas.Add(matricula);
            }

            await _context.SaveChangesAsync();
            return Ok("Aluno matriculado nos cursos.");
        }

        [HttpDelete("Remover")]
        public async Task<IActionResult> RemoverAlunoDeCurso(int alunoId, int cursoId)
        {
            var matricula = await _context.Matriculas
                .FirstOrDefaultAsync(m => m.AlunoId == alunoId && m.CursoId == cursoId);

            if (matricula == null)
                return NotFound("Matrícula não encontrada.");

            _context.Matriculas.Remove(matricula);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
