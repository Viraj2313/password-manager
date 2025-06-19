using System.ComponentModel.DataAnnotations;

namespace PasswordManagerApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string PasswordHash { get; set; }
        public List<PasswordEntry> Passwords { get; set; } = new();
    }
}