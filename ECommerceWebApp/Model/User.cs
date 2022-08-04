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
        public string CartSave { get; set; } = string.Empty;

        public void AddProductToCart(Product product)
        {
            if (!CartSave.Contains(product.IdString))
            {
                if (CartSave != string.Empty)
                {
                    CartSave += $",({product.IdString};{product.Quantity})";
                }
                else
                {
                    CartSave += $"({product.IdString};{product.Quantity})";
                }
            }
            else
            {
                updateProductStringAsync(product);
            }
            UpdateDatabase();
        }

        internal void CleanCart()
        {
            CartSave = string.Empty;
            UpdateDatabase();
        }

        private async void updateProductStringAsync(Product product)
        {
            if (CartSave.Contains(","))
            {
                try
                {
                    string b = CartSave.Substring((CartSave.IndexOf(product.IdString) - 2));
                    if (b.Substring(1).Contains(","))
                    {
                        string c = b.Substring(0, b.Substring(1).IndexOf(",") + 1);
                        await updateProductStringFinalAsync(c, product.Quantity);

                    }
                    else if (b.Contains(","))
                    {
                        await updateProductStringFinalAsync(b, product.Quantity);

                    }
                }
                catch
                {
                    string b = CartSave.Substring((CartSave.IndexOf(product.IdString) - 1));
                    if (b.Substring(1).Contains(","))
                    {
                        string c = b.Substring(0, b.Substring(1).IndexOf(",") + 2);
                        await updateProductStringFinalAsync(c, product.Quantity);

                    }
                    else if (b.Contains(","))
                    {
                        await updateProductStringFinalAsync(b, product.Quantity);
                    }
                }

            }
            else
            {
                Product oldProduct = await StringToProductAsync(CartSave);
                oldProduct.Quantity += product.Quantity;
                CartSave = $"({oldProduct.IdString};{oldProduct.Quantity})";
            }
        }

        private async Task updateProductStringFinalAsync(string b, int productQuantity)
        {
            b = b.Replace(",", "");
            Product oldProduct = await StringToProductAsync(b);
            oldProduct.Quantity += productQuantity;
            CartSave = CartSave.Replace(b, $"({oldProduct.IdString};{oldProduct.Quantity})");
        }

        public async void removeOneFromProduct(string productId)
        {
            if (CartSave.Contains(productId))
            {
                
                if (CartSave.Contains(","))
                {
                    try
                    {
                        string b = CartSave.Substring((CartSave.IndexOf(productId) - 2));
                        if (b.Substring(1).Contains(","))
                        {
                            string c = b.Substring(0, b.Substring(1).IndexOf(",") + 1);
                            await removeoneFromProductStringAsync(c);
                        }
                        else if (b.Contains(","))
                        {
                            await removeoneFromProductStringAsync(b);
                        }
                    }
                    catch
                    {
                        string b = CartSave.Substring((CartSave.IndexOf(productId) - 1));
                        if (b.Substring(1).Contains(","))
                        {
                            string c = b.Substring(0, b.Substring(1).IndexOf(",") + 2);
                            await removeoneFromProductStringAsync(c);
                        }
                        else if (b.Contains(","))
                        {
                            await removeoneFromProductStringAsync(b);

                        }
                    }

                }
                else
                {
                    Product oldProduct = await StringToProductAsync(CartSave);
                    if (oldProduct.Quantity > 1)
                    {
                        oldProduct.Quantity--;
                        CartSave = $"({oldProduct.IdString};{oldProduct.Quantity})";
                    }
                    else
                    {
                        CartSave = string.Empty;
                    }
                }
                UpdateDatabase();
            }
        }

        private async Task removeoneFromProductStringAsync(string c)
        {
            c = c.Replace(",", "");
            Product oldProduct = await StringToProductAsync(c);
            if (oldProduct.Quantity > 1)
            {
                oldProduct.Quantity--;
                CartSave = CartSave.Replace(c, $"({oldProduct.IdString};{oldProduct.Quantity})");

            }
            else
            {
                removeProductString(oldProduct.IdString);
            }
        }

        public void removeProductString(string remove)
        {
            if (CartSave.Contains(remove))
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
            
        }

        private async void UpdateDatabase()
        {
            await UserRepository.UpdateUserAsync(this);
        }

        public async Task<List<Product>> getCartAsync()
        {
            if (CartSave != string.Empty)
            {
                string[] cartObjects = CartSave.Split(",");
                List<Product> products = new List<Product>();
                foreach (string objInCart in cartObjects)
                {
                    products.Add(await StringToProductAsync(objInCart));
                }
                return products;
            }
            return null;
        }

        private async Task<Product> StringToProductAsync(string productString)
        {
            string obj = productString.Replace("(", "");
            obj = obj.Replace(")", "");
            string[] temp = obj.Split(";");
            Product productToAdd = await ProductsRepository.GetProductById(temp[0]);
            productToAdd.Quantity = Int32.Parse(temp[1]);
            return productToAdd;
        }

    }
}
