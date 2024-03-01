using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using SharedLibrary;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Http;
using Newtonsoft.Json;
using System.Net.Http.Formatting;
using System.Security.Cryptography;
using System.Net.Http.Headers;

namespace PasswortmanagerWPF
{
    internal class UserApi : LoginApi
    {
        public UserApi(HttpClient httpClient)
            : base(httpClient)
        {

        }

        public async Task<UserModel> CreateUserAsync(UserDTO userDto)
        {
            userDto.masterKey = EncodeMasterKey(userDto.masterKey);

            var response = await getHttpClient().PostAsJsonAsync("http://localhost:8080/users/create", userDto);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<UserModel>();
        }

        public string EncodeMasterKey(string secret)
        {
            using (var sha512 = SHA512.Create())
            {
                byte[] hash = sha512.ComputeHash(Encoding.UTF8.GetBytes(secret));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }


        public async Task<UserModel> AuthenticateUserAsync(UserDTO userDto)
        {
            userDto.masterKey = EncodeMasterKey(userDto.masterKey);

            var response = await getHttpClient().PostAsJsonAsync("http://localhost:8080/users/authenticate", userDto);

            response.EnsureSuccessStatusCode();

            return JsonConvert.DeserializeObject<UserModel>(await response.Content.ReadAsStringAsync());
        }

    }
}
