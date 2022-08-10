using ECommerceWebApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceWebApp.Data
{
    internal static class ProductsRepository
    {
        internal async static Task<List<Product>> GetProductsAsync()
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Products.ToListAsync();
            }
        }

        internal async static Task<Product> GetProductById(string productID)
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Products.FirstOrDefaultAsync(product => product.IdString.Equals(productID));
            }
        }

        internal async static Task<bool> CreateProductAsync(Product productToCreate)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    await db.Products.AddAsync(productToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdateProductAsync(Product productToUpdate)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    db.Products.Update(productToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DeleteProductAsync(string productId)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    Product productToDelete = await GetProductById(productId);
                    db.Products.Remove(productToDelete);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<Product> GetProductByCategory(string productCategory)
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Products.FirstOrDefaultAsync(product => product.Category.Equals(productCategory));
            }
        }

        internal async static Task<Product> GetProductByName(string searchTerm)
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Products.FirstOrDefaultAsync(product => product.Name.Contains(searchTerm));
            }
        }

        internal async static Task<List<Product>> GetProductsByPriceAsync(decimal startPrice, decimal endPrice)
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Products.Where(product => product.Price >= startPrice && product.Price <= endPrice).ToListAsync();
            }
        }

        internal static async Task<List<Product>> GetProductBySearchTermAsync(SearchTerm searchTerm)
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Products.Where(product => (searchTerm.Name == "" || product.Name.ToLower().Contains(searchTerm.Name.ToLower()))
                                                    && (searchTerm.Category == "" || product.Category.Contains(searchTerm.Category)) 
                                                    && product.Price >= searchTerm.MinPrice 
                                                    && (searchTerm.MaxPrice == 0 || product.Price <= searchTerm.MaxPrice))
                                                    .ToListAsync();
            }
        }

    }


}
