using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceWebApp.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Username { get; set; } = string.Empty;
        [Required]
        public byte[] Password { get; set; } = new byte[0];
        [Required]
        public byte[] PasswordKey { get; set; } = new byte[0];
        [Required, MaxLength(100)]
        public string Role { get; set; }
        
        [Required, MaxLength(1000)]
        public string CartSave { get; set; } = string.Empty;
        public List<Product> productsInCart { get; set; } = new List<Product>();


        [NotMapped]
        public string WebToken { get; set; }

        public void AddProductToCart(Product product)
        {
            productsInCart.Add(product);
            if(CartSave != string.Empty)
            {
                CartSave += "," + product.Id;
            }
            else
            {
                CartSave += product.Id;
            }
        }

        public bool RemoveProductFromCart(Product product)
        {
            if(productsInCart.Count > 0)
            {
                if (productsInCart.Contains(product))
                {
                    productsInCart.Remove(product);
                    CartSave.Remove(product.Id);
                    if(CartSave.Length > 0)
                    {
                        CartSave.Replace(",,", ",");
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
        }

    }
}
