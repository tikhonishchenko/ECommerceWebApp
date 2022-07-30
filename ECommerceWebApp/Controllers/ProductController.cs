using ECommerceWebApp.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerceWebApp.Data;

namespace ECommerceWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private List<Product> products = new List<Product>();
        

        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            products = await ProductsRepository.GetProductsAsync();
            return Ok(products);
        }
    }
}
