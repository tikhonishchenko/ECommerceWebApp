using System.ComponentModel.DataAnnotations;

namespace ECommerceWebApp.Model
{
    public class Product
    {
        [Key]
        public string Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;
        [Required, MaxLength(100)]
        public string imageUrl { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; } = 1;

    }
}
