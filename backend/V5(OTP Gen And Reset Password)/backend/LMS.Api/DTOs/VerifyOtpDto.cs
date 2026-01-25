namespace LMS.Api.Dtos;

public class VerifyOtpDto
{
    public string Email { get; set; } = null!;
    public string Otp { get; set; } = null!;
}
