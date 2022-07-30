using ECommerceWebApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceWebApp.Data
{
    internal static class ProductsRepository
    {
        internal async static Task<List<Product>> GetProductsAsync()
        {
            using(var db = new ProductsDBContext())
            {
                return await db.Products.ToListAsync();
            }
        }

        internal async static Task<Product> GetProductById(int productID)
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Products.FirstOrDefaultAsync( product => product.Id == productID);
            }
        }

        internal async static Task<bool> CreatePostAsync(Product productToCreate)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    await db.Products.AddAsync(productToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch(Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdatePostAsync(Product productToUpdate)
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

        internal async static Task<bool> DeletePostAsync(int productId)
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

    }

    
}
