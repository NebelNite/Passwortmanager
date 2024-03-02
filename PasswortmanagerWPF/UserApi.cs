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
        private static UserApi instance;
        private static readonly object padlock = new object();

        private UserApi(HttpClient httpClient, string connectionString)
            : base(httpClient, connectionString)
        {

        }
        public static UserApi GetInstance()
        {
            if (instance == null)
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new UserApi(new HttpClient(), "http://localhost:8080");
                    }
                }
            }

            return instance;
        }

        public async Task<UserModel> CreateUserAsync(UserDTO userDto)
        {
            userDto.masterKey = EncodeMasterKey(userDto.masterKey);

            var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/create", userDto);
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

            var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/authenticate", userDto);

            response.EnsureSuccessStatusCode();

            return JsonConvert.DeserializeObject<UserModel>(await response.Content.ReadAsStringAsync());
        }

        public async Task<UserModel> GetUserByIdAsync(string userId)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(GetConnectionString() + $"/users/{userId}");
                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<UserModel>(responseContent);
                }
                else
                {
                    return null;
                }
            }
        }

    }

}
