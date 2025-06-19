namespace PasswordManagerApi.Models
{
    public class PasswordEntry
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        
        public string Site { get; set; }

        public string Username { get; set; }

        public string PasswordEnc { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public User? User { get; set; }

    }
}