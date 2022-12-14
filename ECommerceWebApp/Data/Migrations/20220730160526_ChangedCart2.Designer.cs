// <auto-generated />
using System;
using ECommerceWebApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ECommerceWebApp.Data.Migrations
{
    [DbContext(typeof(ProductsDBContext))]
    [Migration("20220730160526_ChangedCart2")]
    partial class ChangedCart2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("ECommerceWebApp.Model.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<int?>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("imageUrl")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Description of product 1",
                            Name = "Product 1",
                            Price = 1.11m,
                            imageUrl = "https://web.dev/easy-high-dpi-images/"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Description of product 2",
                            Name = "Product 2",
                            Price = 2.22m,
                            imageUrl = "https://web.dev/easy-high-dpi-images/"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Description of product 3",
                            Name = "Product 3",
                            Price = 3.33m,
                            imageUrl = "https://web.dev/easy-high-dpi-images/"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Description of product 4",
                            Name = "Product 4",
                            Price = 4.44m,
                            imageUrl = "https://web.dev/easy-high-dpi-images/"
                        },
                        new
                        {
                            Id = 5,
                            Description = "Description of product 5",
                            Name = "Product 5",
                            Price = 5.55m,
                            imageUrl = "https://web.dev/easy-high-dpi-images/"
                        });
                });

            modelBuilder.Entity("ECommerceWebApp.Model.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CartSave")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordKey")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ECommerceWebApp.Model.Product", b =>
                {
                    b.HasOne("ECommerceWebApp.Model.User", null)
                        .WithMany("products")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("ECommerceWebApp.Model.User", b =>
                {
                    b.Navigation("products");
                });
#pragma warning restore 612, 618
        }
    }
}
