using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matriculas.Infrastructure;
using Matriculas.Domain.Model;

namespace Matriculas.API.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class CursoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CursoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("BuscaCurso")]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            var cursos = await _context.Curso.ToListAsync();
            return Ok(cursos);
        }

        [HttpGet("BuscaCursoId")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _context.Curso.FindAsync(id);
            if (curso == null)
                return NotFound();

            return Ok(curso);
        }

        [HttpPost("CriaCurso")]
        public async Task<ActionResult<Curso>> CreateCurso([FromBody] CreateCursoDTO cursoDto)
        {
            var novoCurso = new Curso
            {
                Nome = cursoDto.Nome,
                Descricao = cursoDto.Descricao
            };

            _context.Curso.Add(novoCurso);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetCurso),
                new { id = novoCurso.Id },
                novoCurso
            );
        }


        [HttpPut("AtualizaCurso")]
        public async Task<IActionResult> UpdateCurso(int id, Curso curso)
        {
            if (id != curso.Id)
                return BadRequest("ID da URL diferente do ID do objeto.");

            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CursoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("DeletaCurso")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var curso = await _context.Curso.FindAsync(id);
            if (curso == null)
                return NotFound();

            _context.Curso.Remove(curso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CursoExists(int id)
        {
            return _context.Curso.Any(e => e.Id == id);
        }
    }
}
