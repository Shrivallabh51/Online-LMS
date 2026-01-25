using LMS.Api.Data;
using LMS.Api.Models;
using LMS.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.Api.Controllers;

[ApiController]
[Route("api/submissions")]
[Authorize(Roles = "1")] // Student
public class AssignmentSubmissionController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly FileStorageService _fileService;

    public AssignmentSubmissionController(
        AppDbContext context,
        FileStorageService fileService)
    {
        _context = context;
        _fileService = fileService;
    }

    // 🔹 Submit assignment (Student)
    [HttpPost("{assignmentId}")]
    public async Task<IActionResult> SubmitAssignment(
        int assignmentId,
        [FromForm] IFormFile file)
    {
        // Validate file
        if (file == null || file.Length == 0)
            return BadRequest("File is required");

        // Get student ID from JWT
        var studentIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (studentIdClaim == null)
            return Unauthorized("Invalid token");

        int studentId = int.Parse(studentIdClaim.Value);

        // Upload file
        var fileUrl = await _fileService.UploadAsync(file, "submissions");

        // Save submission
        var submission = new AssignmentSubmission
        {
            AssignmentId = assignmentId,
            StudentId = studentId,
            UploadedFile = fileUrl,
            UploadedOn = DateTime.UtcNow,
            Status = "Submitted"
        };

        _context.AssignmentSubmissions.Add(submission);
        _context.SaveChanges();

        return Ok(submission);
    }
}
