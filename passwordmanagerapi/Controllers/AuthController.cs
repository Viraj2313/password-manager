using Microsoft.AspNetCore.Mvc;
using PasswordManagerApi.Models;
using PasswordManagerApi.Data;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using PasswordManagerApi.Dtos;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api")]
public class AuthController : ControllerBase
{
    private readonly MainDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(MainDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(UserDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return BadRequest("User already exists.");

        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        var token = GenerateJwtToken(user);

        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddHours(3)
        });

        return Ok(new { message = "User created and logged in successfully." ,UserId = user.Id});
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Signin(LoginDto request)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials.");

        var token = GenerateJwtToken(user);
        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddHours(3)
        });

        return Ok(new { message = "Login successful" ,userId=user.Id});
    }
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt");
        return Ok(new { message = "Logged out" });
    }

    [Authorize]
    [HttpGet("get-user-id")]
    public IActionResult GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();
        int userId = int.Parse(userIdClaim.Value);
        return Ok(new
        {
            UserId = userId
        });
    }
    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(3),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
