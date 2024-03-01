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
        private HttpClient _httpClient { get; set; }

        public LoginApi(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public HttpClient getHttpClient()
        {
            return _httpClient;
        }

    }
}
