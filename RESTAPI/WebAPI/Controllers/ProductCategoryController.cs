using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductCategoryController(IConfiguration configuration) 
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //Query for getting Category information
            string query = @"select CategoryId, CategoryName, Description, Status from dbo.ProductCategory";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TechnicalTestAppcon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(ProductCategory cat)
        {
            //Query for product category insertion
            string query = @"
                    insert into dbo.ProductCategory values 
                    ('" + cat.CategoryName + @"','" + cat.Description + @"','" + cat.Status + @"')";
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
        public JsonResult Put(ProductCategory cat)
        {
            //Query for updating product category
            string query = @"
                    update dbo.ProductCategory set 
                    CategoryName = '" + cat.CategoryName + @"',
                    Description = '" + cat.Description + @"',
                    Status = '" + cat.Status + @"'
                    where CategoryId = " + cat.CategoryId + @" 
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
                    delete from dbo.ProductCategory
                    where CategoryId = " + id + @" 
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
