using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PasswortmanagerWPF
{
    internal abstract class LoginApi
    {
        private HttpClient _httpClient;
        private string _connectionString;

        public LoginApi(HttpClient httpClient, string connectionString)
        {
            _httpClient = httpClient;
            _connectionString = connectionString;
        }

        public HttpClient GetHttpClient()
        {
            return _httpClient;
        }


        public string GetConnectionString()
        {
            return _connectionString;
        }

    }
}
