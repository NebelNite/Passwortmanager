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

            var response = await getHttpClient().PostAsJsonAsync("http://localhost:8080/users", userDto);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<UserModel>();

        }

        public async Task<UserModel> AuthenticateUserAsync(UserDTO userDto)
        {
            var response = await getHttpClient().PostAsJsonAsync("http://localhost:8080/users/authenticate", userDto);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<UserModel>();
        }

        /*
        public async Task<UserModel> GetUserAsync(string id)
        {
            var response = await getHttpClient().GetAsync("http://localhost:8080/users/" + id);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<UserModel>();
        }

        public async Task<PasswortModel> AddPasswordAsync(string userId, PasswortDTO passwortDto)
        {
            var userResponse = await getHttpClient().GetAsync("http://localhost:8080/users/" + userId);
            userResponse.EnsureSuccessStatusCode();

            var user = await userResponse.Content.ReadAsAsync<UserModel>();
            passwortDto.setUser(user);

            var passwortResponse = await getHttpClient().PostAsJsonAsync($"https://example.com/users/{userId}/addPassword", passwortDto);
            passwortResponse.EnsureSuccessStatusCode();
            return await passwortResponse.Content.ReadAsAsync<PasswortModel>();
        }
        
    }*/

    }
}
