using BCrypt.Net;
using LMS.Api.Data;
using LMS.Api.Dtos;
using LMS.Api.Models;
using LMS.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LMS.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;
    private readonly EmailService _emailService;

    public AuthController(
        AppDbContext context,
        IConfiguration config,
        EmailService emailService)
    {
        _context = context;
        _config = config;
        _emailService = emailService;
    }

    // ================= REGISTER =================
    [HttpPost("register")]
    public IActionResult Register(RegisterDto dto)
    {
        if (_context.Users.Any(u => u.Username == dto.Username))
            return BadRequest("Username already exists");

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RoleId = dto.RoleId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok("User registered successfully");
    }

    // ================= LOGIN =================
    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _context.Users
            .Include(u => u.Role)
            .FirstOrDefault(u => u.Username == dto.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Role, user.Role.RoleName)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(_config["Jwt:ExpiryMinutes"]!)),
            signingCredentials: new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256)
        );

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            role = user.Role.RoleName
        });
    }

    // ================= FORGOT PASSWORD =================
    [HttpPost("forgot-password")]
    public IActionResult ForgotPassword(ForgotPasswordDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
        if (user == null)
            return Ok("If email exists, OTP will be sent");

        // Rate limit (1 OTP per minute)
        var recentOtp = _context.PasswordResetOtps.Any(o =>
            o.UserId == user.UserId &&
            o.CreatedAt > DateTime.UtcNow.AddMinutes(-1));

        if (recentOtp)
            return Ok("Please wait before requesting another OTP");

        var otp = new Random().Next(100000, 999999).ToString();

        var reset = new PasswordResetOtp
        {
            UserId = user.UserId,
            OtpHash = BCrypt.Net.BCrypt.HashPassword(otp),
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = DateTime.UtcNow.AddMinutes(10),
            IsUsed = false
        };

        _context.PasswordResetOtps.Add(reset);
        _context.SaveChanges();

        _emailService.SendOtp(user.Email, otp);

        return Ok("OTP sent to email");
    }

    // ================= VERIFY OTP =================
    [HttpPost("verify-otp")]
    public IActionResult VerifyOtp(VerifyOtpDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
        if (user == null) return BadRequest("Invalid OTP");

        var otpEntry = _context.PasswordResetOtps
            .Where(o => o.UserId == user.UserId && !o.IsUsed)
            .OrderByDescending(o => o.CreatedAt)
            .FirstOrDefault();

        if (otpEntry == null ||
            otpEntry.ExpiresAt < DateTime.UtcNow ||
            !BCrypt.Net.BCrypt.Verify(dto.Otp, otpEntry.OtpHash))
            return BadRequest("Invalid or expired OTP");

        return Ok("OTP verified");
    }

    // ================= RESET PASSWORD =================
    [HttpPost("reset-password")]
    public IActionResult ResetPassword(ResetPasswordDto dto)
    {
        if (dto.NewPassword.Length < 8)
            return BadRequest("Password must be at least 8 characters");

        var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
        if (user == null) return BadRequest();

        var otpEntry = _context.PasswordResetOtps
            .Where(o => o.UserId == user.UserId && !o.IsUsed)
            .OrderByDescending(o => o.CreatedAt)
            .FirstOrDefault();

        if (otpEntry == null ||
            otpEntry.ExpiresAt < DateTime.UtcNow ||
            !BCrypt.Net.BCrypt.Verify(dto.Otp, otpEntry.OtpHash))
            return BadRequest("Invalid or expired OTP");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        otpEntry.IsUsed = true;

        _context.SaveChanges();

        return Ok("Password reset successful");
    }
}
