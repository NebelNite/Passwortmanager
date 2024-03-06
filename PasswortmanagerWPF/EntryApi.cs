using SharedLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using SharedLibrary;
using System.Windows;
using Newtonsoft.Json.Bson;

namespace PasswortmanagerWPF
{
    internal class EntryApi : LoginApi
    {
        private static EntryApi instance;
        private static readonly object lockObject = new object();

        public event EventHandler<UserModel> EntryCreated;

        private EntryApi(HttpClient httpClient, string connectionString)
            : base(httpClient, connectionString)
        {

        }



        public static EntryApi GetInstance()
        {
            if (instance == null)
            {
                lock (lockObject)
                {
                    if (instance == null)
                    {
                        instance = new EntryApi(new HttpClient(), "http://localhost:8080");
                    }
                }
            }
            return instance;
        }


        public async void deleteEntry(EntryModel selectedEntry)
        {

            UserModel user = UserApi.user;
            UserDTO userDTO = new UserDTO();

            userDTO.username = user.username;
            userDTO.id = user.id;
            userDTO.masterKey = user.masterKey;
            userDTO.entries = user.entries;

        }


        public async void editEntry(EntryDTO entryDto)
        {

        }


        public async void createEntry(EntryDTO entryDto)
        {
            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();

                userDTO.username = user.username;
                userDTO.id = user.id;
                userDTO.masterKey = user.masterKey;
                userDTO.entries = user.entries;

                UserApi userApi = UserApi.GetInstance();


                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/" + user.id + "/addEntry", entryDto);
                response.EnsureSuccessStatusCode();

                /*
                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/create", entryDto);
                response.EnsureSuccessStatusCode();


                UserModel entryModel = await response.Content.ReadAsAsync<UserModel>();
                */

                EntryCreated?.Invoke(this, user);

            }
            catch (Exception ex)
            {
                MessageBox.Show("Editing Entry failed!");
            }
        }



    }
}
