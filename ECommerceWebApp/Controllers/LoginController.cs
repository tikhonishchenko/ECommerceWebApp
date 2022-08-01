using ECommerceWebApp.Data;
using ECommerceWebApp.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ECommerceWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private User activeUser { get; set; }

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpGet("registerUser/{username}/{password}")]
        
        public async Task<IActionResult> RegisterUserAsync(string username, string password)
        {
            UserDTO user = new UserDTO
            {
                Username = username,
                Password = password
            };
            if (user != null)
            {
                User userObj = user.GenerateUser();
                if (await UserRepository.CreateUserAsync(userObj))
                {
                    return Ok(userObj);
                }
                else
                {
                    return BadRequest("Invalid client request2");
                }
            }
            return BadRequest("Invalid client request");
        }
        [AllowAnonymous]
        [HttpGet("registerAdmin/{username}/{password}")]
        public async Task<IActionResult> RegisterAdminAsync(string username, string password)
        {
            UserDTO user = new UserDTO
            {
                Username = username,
                Password = password
            };
            if (user != null)
            {
                User userObj = user.GenerateAdmin();
                if(await UserRepository.CreateUserAsync(userObj))
                {
                    return Ok(userObj);
                }
                else
                {
                    return BadRequest("Invalid client request2");
                }
               
            }
            return BadRequest("Invalid client request");
        }

        [AllowAnonymous]
        [HttpGet("login/{username}/{password}")]  
        public async Task<IActionResult> LoginAsync(string username, string password)
        {
            UserDTO user = new UserDTO
            {
                Username = username,
                Password = password
            };
            
            if (user != null)
            {
                User foundUser = await  UserRepository.FindUserAsync(user);
                if (foundUser != null)
                {
                    if (user.CheckPassword(foundUser.Password, foundUser.PasswordKey))
                    {
                        var token = CreateToken(foundUser);
                        activeUser = foundUser;

                        var refreshToken = GenerateRefreshToken(token);
                        SetRefreshToken(refreshToken);

                        return Ok(token);
                    }
                }
                return Unauthorized();
            }
            return BadRequest("Invalid client request");
        }

        private void SetRefreshToken(RefreshToken refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = refreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);

            activeUser.WebToken = refreshToken.Token;
        }

       

        private RefreshToken GenerateRefreshToken(string token)
        {
            var refreshToken = new RefreshToken
            {
                Token = token,
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        [Authorize]
        [HttpGet("showUser")]
        public IActionResult ShowUser()
        {
            return Ok("Welcome to los pollos hermanos!");
        }

        [Authorize(Roles="Admin")]
        [HttpGet("showAdmin")]
        public IActionResult ShowAdmin()
        {
            return Ok("You can call me gus");
        }

        [AllowAnonymous]
        [HttpGet("showAnon")]
        public IActionResult ShowNobody()
        {
            return Ok($"this is anon panel and you are {GetCurrentUser().Username}");
        }

        
        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new User
                {
                    Username = userClaims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                    Role = userClaims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value
                };
            }

            return null;
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Surname, user.CartSave)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
