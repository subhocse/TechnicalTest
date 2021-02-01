using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ProductController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //Query for getting Category information
            string query = @"
                    select ProductId, ProductName, Category, Cost, ProductDescription, Status
                    from dbo.Product";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TechnicalTestAppcon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Product p)
        {
            //Query for product category insertion
            string query = @"
                    insert into dbo.Product 
                    (ProductName,Category,Cost,ProductDescription,Status)
                    values 
                    (
                    '" + p.ProductName + @"'
                    ,'" + p.Category + @"'
                    ,'" + p.Cost + @"'
                    ,'" + p.ProductDescription + @"'
                    ,'" + p.Status + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TechnicalTestAppcon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Product p)
        {
            //Query for updating product category
            string query = @"
                    update dbo.Product set 
                    ProductName = '" + p.ProductName + @"'
                    ,Category = '" + p.Category + @"'
                    ,Cost = '" + p.Cost + @"'
                    ,ProductDescription = '" + p.ProductDescription + @"'
                    ,Status = '" + p.Status + @"'
                    where ProductId = " + p.ProductId + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TechnicalTestAppcon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            //Query to delete product category
            string query = @"
                    delete from dbo.Product
                    where ProductId = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TechnicalTestAppcon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}