using ECommerceWebApp.Model;
using Microsoft.EntityFrameworkCore;

namespace ECommerceWebApp.Data
{
    internal sealed class ProductsDBContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("DataSource=./Data/ProductsDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Product[] productsToSeed = new Product[5];

            for (int i = 1; i <= 5 ; i++)
            {
                productsToSeed[i-1] = new Product
                {
                    Id = i,
                    Name = "Product "+i,
                    Description = "Description of product " + i,
                    imageUrl = "https://web.dev/easy-high-dpi-images/",
                    Price = i*1.11m
                };
            
            }

            modelBuilder.Entity<Product>().HasData(productsToSeed);
        }
    }
}
