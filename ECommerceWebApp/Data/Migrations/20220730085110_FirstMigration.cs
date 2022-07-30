using Microsoft.EntityFrameworkCore.Migrations;

namespace ECommerceWebApp.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    imageUrl = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price", "imageUrl" },
                values: new object[] { 1, "Description of product 1", "Product 1", 1.11m, "https://web.dev/easy-high-dpi-images/" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price", "imageUrl" },
                values: new object[] { 2, "Description of product 2", "Product 2", 2.22m, "https://web.dev/easy-high-dpi-images/" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price", "imageUrl" },
                values: new object[] { 3, "Description of product 3", "Product 3", 3.33m, "https://web.dev/easy-high-dpi-images/" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price", "imageUrl" },
                values: new object[] { 4, "Description of product 4", "Product 4", 4.44m, "https://web.dev/easy-high-dpi-images/" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price", "imageUrl" },
                values: new object[] { 5, "Description of product 5", "Product 5", 5.55m, "https://web.dev/easy-high-dpi-images/" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
