using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManagerApi.Data;
using PasswordManagerApi.Dtos;
using PasswordManagerApi.Models;

namespace PasswordManagerApi.Controllers
{
    [ApiController]
    [Route("api/passwords")]
    public class PasswordsController : ControllerBase
    {
        private readonly MainDbContext _context;
        private readonly IDataProtector _protector;

        public PasswordsController(MainDbContext context, IDataProtectionProvider provider)
        {
            _context = context;
            _protector = provider.CreateProtector("PasswordManager");
        }

        [Authorize]
        [HttpGet("get-passwords")]
        public async Task<IActionResult> GetUserPasswords()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");
            int userId = int.Parse(userIdClaim.Value);
            var passwords = await _context.Passwords.Where(p => p.UserId == userId).ToListAsync();
            var decrypted = passwords.Select(p => new
            {
                p.Id,
                p.Site,
                p.Username,
                Password = _protector.Unprotect(p.PasswordEnc)
            });
            return Ok(decrypted);
        }

        [Authorize]
        [HttpPost("add-password")]
        public async Task<IActionResult> AddPassword([FromBody] PasswordEntry entry)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");
            int userId = int.Parse(userIdClaim.Value);
            entry.UserId = userId;
            entry.PasswordEnc = _protector.Protect(entry.PasswordEnc);
            _context.Passwords.Add(entry);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpPost("delete-password")]
        public async Task<IActionResult> DeletePassword([FromBody] DelPasswordReq delPassword)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            int userId = int.Parse(userIdClaim.Value);
            var password = _context.Passwords.FirstOrDefaultAsync(p => p.Id == delPassword.Id && p.UserId == userId);
            if (password == null)
            {
                return NotFound("Password not found");
            }
            _context.Remove(password);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Password deleted from vault" });
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetPassword(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            int userId = int.Parse(userIdClaim.Value);

            var passwordEntry = await _context.Passwords
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (passwordEntry == null)
            {
                return NotFound(new { message = "Password not found" });
            }

            return Ok(passwordEntry);
        }
        [Authorize]
[HttpPut("edit-password/{id}")]
public async Task<IActionResult> EditPassword(int id, [FromBody] EditPasswordDto editDto)
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null)
    {
        return Unauthorized("User ID not found in token.");
    }
    
    int userId = int.Parse(userIdClaim.Value);
    
    var passwordEntry = await _context.Passwords
        .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
    
    if (passwordEntry == null)
    {
        return NotFound(new { message = "Password not found" });
    }
    
    passwordEntry.Site = editDto.Site;
    passwordEntry.Username = editDto.Username;
    
    if (!string.IsNullOrEmpty(editDto.Password))
    {
        passwordEntry.PasswordEnc = _protector.Protect(editDto.Password);
    }
    
    await _context.SaveChangesAsync();
    
    return Ok(new { message = "Password updated successfully" });
}
        
    }
}
