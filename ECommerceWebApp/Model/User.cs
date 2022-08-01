using ECommerceWebApp.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

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
        public string CartSave { get; set; }

        [NotMapped]
        public string WebToken { get; set; }

        public void AddProductToCart(Product product)
        {
            if (CartSave != string.Empty)
            {
                CartSave += "," + product.Id;
            }
            else
            {
                CartSave += product.Id;
            }
            UpdateDatabase();
        }

        public void removeProductString(string remove)
        {
            if (CartSave.Contains(","))
            {
                try
                {
                    string b = CartSave.Substring((CartSave.IndexOf(remove) - 2));
                    if (b.Substring(1).Contains(","))
                    {
                        string c = b.Substring(0, b.Substring(1).IndexOf(",") + 1);
                        CartSave = CartSave.Replace(c, "");
                    }
                    else if (b.Contains(","))
                    {
                        CartSave = CartSave.Replace(b, "");
                    }
                }
                catch
                {
                    string b = CartSave.Substring((CartSave.IndexOf(remove) - 1));
                    if (b.Substring(1).Contains(","))
                    {
                        string c = b.Substring(0, b.Substring(1).IndexOf(",") + 2);
                        CartSave = CartSave.Replace(c, "");
                    }
                    else if (b.Contains(","))
                    {
                        CartSave = CartSave.Replace(b, "");
                    }
                }

            }
            else
            {
                CartSave = string.Empty;
            }
            UpdateDatabase();
        }

        private async void UpdateDatabase()
        {
            await UserRepository.UpdateUserAsync(this);
        }

        public async Task<List<Product>> getCartAsync()
        {
            string[] cartObjects = CartSave.Split(",");
            List<Product> products = new List<Product>();
            foreach (string objInCart in cartObjects)
            {
                objInCart.Replace("(", "");
                objInCart.Replace(")", "");
                string[] temp = objInCart.Split(";");
                Product productToAdd = await ProductsRepository.GetProductById(temp[0]);
                productToAdd.Quantity = Int32.Parse(temp[1]);
                products.Add(productToAdd);
            }
            return products;
        }

    }
}
