using ECommerceWebApp.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerceWebApp.Data
{
    internal static class UserRepository
    {
        internal async static Task<List<User>> GetUsersAsync()
        {
            using(var db = new ProductsDBContext())
            {
                return await db.Users.ToListAsync();
            }
        }

        internal async static Task<User> GetUserById(int productID)
        {
            using (var db = new ProductsDBContext())
            {
                return await db.Users.FirstOrDefaultAsync( product => product.Id == productID);
            }
        }

        internal async static Task<bool> CreateUserAsync(User userToCreate)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    await db.Users.AddAsync(userToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch(Exception e)
                {
                    
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdateUserAsync(User userToUpdate)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    db.Users.Update(userToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DeleteUserAsync(int userId)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    User userToDelete = await GetUserById(userId);
                    db.Users.Remove(userToDelete);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<User> FindUserAsync(UserDTO userToFind)
        {
            using (var db = new ProductsDBContext())
            {
                try
                {
                    return await db.Users.FirstOrDefaultAsync(user => user.Username == userToFind.Username);
                }
                catch (Exception e)
                {
                    return null;
                }
            }
        }

    }

    
}
