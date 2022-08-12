using ECommerceWebApp.Model;
using Microsoft.EntityFrameworkCore;

namespace ECommerceWebApp.Data
{
    internal sealed class ProductsDBContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("DataSource=./Data/ProductsDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder) { }
        
    }
}
