using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Product
    {

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public decimal Cost { get; set; }
        public string ProductDescription { get; set; }
        public string Status { get; set; }

    }
}
