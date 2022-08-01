using ECommerceWebApp.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ECommerceWebApp.Data;
using System.Data;

namespace ECommerceWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private List<Product> products = new List<Product>();

        [HttpGet("products")]
        public async Task<ActionResult<ServiceResponse<List<Product>>>> GetProducts()
        {
            products = await ProductsRepository.GetProductsAsync();
            var response = new ServiceResponse<List<Product>>()
            {
                Data = products
            };

            return Ok(response);
        }
    }
}
