using Microsoft.EntityFrameworkCore;
using PasswordManagerApi.Models;

namespace PasswordManagerApi.Data
{
    public class MainDbContext(DbContextOptions<MainDbContext> options) : DbContext(options)
    {

        public DbSet<User> Users { get; set; }
        public DbSet<PasswordEntry> Passwords { get; set; }
    }
}