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
        private HttpClient httpClient;
        private string connectionString;

        public LoginApi(HttpClient httpClient, string connectionString)
        {
            this.httpClient = httpClient;
            this.connectionString = connectionString;
        }


        public HttpClient GetHttpClient()
        {
            return httpClient;
        }
        

        public string GetConnectionString()
        {
            return connectionString;
        }

    }
}
