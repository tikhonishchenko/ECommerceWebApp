using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

namespace ECommerceWebApp.Model
{
    public class UserDTO
    {
        //public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        internal User GenerateUser()
        {
            CreatePasswordHash(Password, out byte[] passwordHash, out byte[] passwordSalt);
            User newUser = new User
            {
                Username = Username,
                Email = Email,
                Password = passwordHash,
                PasswordKey = passwordSalt,
                Role = Role,
                CartSave = String.Empty,
                //productsInCart = new List<Product>()

            };
            return newUser;
        }

        internal bool CheckPassword( byte[] passwordHash, byte[] passwordSalt)
        {
            return VerifyPasswordHash(Password, passwordHash, passwordSalt);
        }
        

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
