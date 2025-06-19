namespace PasswordManagerApi.Dtos
{
    public class EditPasswordDto
    {
        public string Site { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string? Password { get; set; } 
    }
}