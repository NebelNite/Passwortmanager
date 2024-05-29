
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
//using SharedLibrary;
using System.Windows;
using Newtonsoft.Json.Bson;
using Newtonsoft.Json;
using System.Security.Cryptography;
using CredentialManagement;
using System.Net.PeerToPeer;

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




        public async Task DeleteEntry(EntryModel selectedEntry)
        {
            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();

                userDTO.username = user.username;
                userDTO.id = user.id;
                userDTO.masterKey = user.masterKey;
                userDTO.entries = user.entries;


                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/delete/" + selectedEntry.id, userDTO);
                response.EnsureSuccessStatusCode();

                int entryCount = user.entries.Count;

                for (int i = 0; entryCount == user.entries.Count; i++)
                {
                    if (user.entries[i].id == selectedEntry.id)
                    {
                        user.entries.RemoveAt(i);
                    }
                }

                UserApi.user = user;

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Deleting Entry failed!");
            }
        }



        public async Task EditEntry(EntryDTO entryDto)
        {

            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();
                userDTO.id = user.id;

                entryDto = Encryption.EncryptEntry(entryDto);

                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/editEntry/" + userDTO.id, entryDto);
                response.EnsureSuccessStatusCode();


                UserApi.user = await UserApi.GetInstance().GetUserById(UserApi.user.id);

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Editing Entry failed!");
            }

        }



        public async Task CreateEntry(EntryDTO entryDto)
        {
            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();

                userDTO.username = user.username;
                userDTO.id = user.id;
                userDTO.masterKey = user.masterKey;

                userDTO.entries = user.entries;


                entryDto = Encryption.EncryptEntry(entryDto);

                UserApi userApi = UserApi.GetInstance();

                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/addEntry/" + user.id, entryDto);
                response.EnsureSuccessStatusCode();


                UserApi.user = await UserApi.GetInstance().GetUserById(UserApi.user.id);

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Creating/Editing Entry failed!");
            }
        }



    }
}
