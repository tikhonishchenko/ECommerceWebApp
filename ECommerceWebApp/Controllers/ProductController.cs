using ECommerceWebApp.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerceWebApp.Data;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Claims;
using System.Linq;

namespace ECommerceWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private List<Product> products = new List<Product>();
        private IConfiguration _config;
        private User activeUser;

        public ProductController(IConfiguration config)
        {
            _config = config;
            
        }


        [HttpGet("products")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            products = await ProductsRepository.GetProductsAsync();

            return Ok(products);
        }

        [HttpGet("products/{id}")]
        public async Task<ActionResult<List<Product>>> GetProductById(string id)
        {

            return Ok(await ProductsRepository.GetProductById(id));

        }

        [Authorize]
        [HttpPost("addToCart/{id}")]
        public async Task<IActionResult> AddToCartAsync(string id)
        {
            CheckUser();
            Product productToAdd = await ProductsRepository.GetProductById(id);
            activeUser.AddProductToCart(productToAdd);
            
            return Ok(activeUser.getCartAsync());
        }

        private void CheckUser()
        {
            if (activeUser == null)
            {
                activeUser = GetCurrentUser();
            }
        }

        [Authorize]
        [HttpGet("getCart")]
        public IActionResult GetCart()
        {
            CheckUser();
            return Ok(activeUser.getCartAsync());
        }
        [Authorize]
        [HttpGet("getUser")]
        public IActionResult GetUser()
        {
            CheckUser();
            return Ok(activeUser);
        }



        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                User userFound = UserRepository.FindUserAsync(new UserDTO
                {
                    Username = userClaims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value
                }).Result;
                return userFound;
            }

            return null;
        }
    }
    

}
