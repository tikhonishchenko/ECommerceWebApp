using ECommerceWebApp.Data;
using ECommerceWebApp.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
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
        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("register-user")]
        public async Task<IActionResult> RegisterUserAsync(UserDTO user)
        {
            
            if (user != null)
            {
                if (await UserRepository.FindUserAsync(user.Username) == null)
                {
                    User userObj = user.GenerateUser();
                    if (await UserRepository.CreateUserAsync(userObj))
                    {
                        return Ok(user);
                    }
                    else
                    {
                        return BadRequest("Can't add to database");
                    }
                }
                else
                {
                    return BadRequest("user already exist");
                }
            }
            return BadRequest("Invalid client request");
        }
        /*
        [AllowAnonymous]
        [HttpGet("register-admin/{username}/{password}")]
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
        */

        [HttpPost("check-user")]
        public IActionResult CheckUser()
        {
            if (HttpContext.User == null)
            {
                return BadRequest("You must login");
            }
            else
            {
                return Ok();
            }
        }
        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return BadRequest("You are logged out!");
        }

        [AllowAnonymous]
        [HttpPost("login")]  
        public async Task<IActionResult> LoginAsync(UserDTO user)
        {
            
            if (GetCurrentUser() != null)
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            }

            
            if (user != null)
            {
                User foundUser = await  UserRepository.FindUserAsync(user.Username);
                if (foundUser != null)
                {
                    if (user.CheckPassword(foundUser.Password, foundUser.PasswordKey))
                    {
                        //authorization
                        CreateTokenAsync(foundUser);

                        return Ok(foundUser);
                    }
                }
                return Ok("no user");
            }
            return BadRequest("Invalid client request");
        }


        [Authorize]
        [HttpGet("show-user")]
        public IActionResult ShowUser()
        {
            return Ok(HttpContext.User);
        }

        [Authorize(Roles="Admin")]
        [HttpGet("show-admin")]
        public IActionResult ShowAdmin()
        {
            return Ok(HttpContext.User);
        }

        [AllowAnonymous]
        [HttpGet("show-anon")]
        public IActionResult ShowNobody()
        {
            return Ok(GetCurrentUser());
        }
        [Authorize]
        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUserAsync(User user)
        {
            await UserRepository.UpdateUserAsync(user);
            return Ok("User updated");
        }

        [Authorize]
        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUserAsync(User user)
        {
            if (GetCurrentUser().Username == user.Username)
            {
                await UserRepository.DeleteUserAsync(user.Id);
                return Ok("User deleted");
            }
            else
            {
                return BadRequest("Not allowed");
            }
            return BadRequest("something went wrong");

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
        private async void CreateTokenAsync(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Surname, user.CartSave)
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                // Refreshing the authentication session should be allowed.

                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                IssuedUtc = DateTime.UtcNow,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
        }
    }
}
