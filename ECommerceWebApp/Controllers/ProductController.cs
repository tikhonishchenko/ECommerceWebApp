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

        [HttpGet("product-by-id/{id}")]
        public async Task<ActionResult<List<Product>>> GetProductById(string id)
        {

            return Ok(await ProductsRepository.GetProductById(id));

        }

        [Authorize]
        [HttpPost("clean-cart")]
        public async Task<IActionResult> CleanCart(string id)
        {
            CheckUser();

            activeUser.CleanCart();

            return Ok(activeUser.CartSave);
        }

        [Authorize]
        [HttpPost("add-to-cart/{id}")]
        public async Task<IActionResult> AddToCartAsync(string id)
        {
            CheckUser();
            Product productToAdd = await ProductsRepository.GetProductById(id);
            
            activeUser.AddProductToCart(productToAdd);
            
            return Ok(activeUser.CartSave);
        }

        [Authorize]
        [HttpPost("remove-from-cart/{id}")]
        public async Task<IActionResult> RemoveFromCartAsync(string id)
        {
            CheckUser();
            Product productToRemove = await ProductsRepository.GetProductById(id);

            activeUser.removeProductString(productToRemove.IdString);

            return Ok(activeUser.CartSave);
        }

        [Authorize]
        [HttpPost("remove-one-from-cart/{id}")]
        public async Task<IActionResult> RemoveOneFromCartAsync(string id)
        {
            CheckUser();
            Product productToRemove = await ProductsRepository.GetProductById(id);

            activeUser.removeOneFromProduct(productToRemove.IdString);

            return Ok(activeUser.CartSave);
        }

        private void CheckUser()
        {
            if (activeUser == null)
            {
                activeUser = GetCurrentUser();
            }
        }

        [Authorize]
        [HttpGet("get-cart")]
        public IActionResult GetCart()
        {
            CheckUser();
            return Ok(activeUser.getCartAsync());
        }
        [Authorize]
        [HttpGet("get-user")]
        public IActionResult GetUser()
        {
            CheckUser();
            return Ok(activeUser);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-product")]
        public async Task<IActionResult> AddProduct(Product product)
        {
            await ProductsRepository.CreateProductAsync(product);
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update-product")]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            await ProductsRepository.UpdateProductAsync(product);
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-product/{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            await ProductsRepository.DeleteProductAsync(id);
            return Ok();
        }
        [HttpGet("find-product/{searchTerm}")]
        public async Task<IActionResult> FindProductByName(string searchTerm)
        {
            return Ok(await ProductsRepository.GetProductByName(searchTerm));
        }
        [HttpGet("find-product-by-category/{category}")]
        public async Task<IActionResult> FindProductByCategory(string category)
        {
            return Ok(await ProductsRepository.GetProductByCategory(category));
        }
        [HttpGet("find-product-by-price/{startPrice}/{endPrice}")]
        public async Task<IActionResult> FindProductByPrice(decimal startPrice, decimal endPrice)
        {
            return Ok(await ProductsRepository.GetProductsByPriceAsync(startPrice, endPrice));
        }
        [HttpPost("find-product-by-params")]
        public async Task<IActionResult> FindProductByParams(SearchTerm searchTerm)
        {
            return Ok(await ProductsRepository.GetProductBySearchTermAsync(searchTerm));
        }



        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                User userFound = UserRepository.FindUserAsync(userClaims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value).Result;
                return userFound;
            }

            return null;
        }
    }
    

}
