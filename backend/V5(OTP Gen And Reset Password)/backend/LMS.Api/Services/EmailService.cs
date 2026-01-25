using System.Net;
using System.Net.Mail;

namespace LMS.Api.Services;

public class EmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public void SendOtp(string toEmail, string otp)
    {
        var smtp = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            EnableSsl = true,
            UseDefaultCredentials = false, // 🔥 IMPORTANT
            Credentials = new NetworkCredential(
                _config["Email:Username"],
                _config["Email:Password"]
            )
        };

        var message = new MailMessage
        {
            From = new MailAddress(_config["Email:Username"]!),
            Subject = "Password Reset OTP",
            Body = $"Your OTP is: {otp}\nValid for 10 minutes.",
            IsBodyHtml = false
        };

        message.To.Add(toEmail);

        smtp.Send(message);
    }
}
