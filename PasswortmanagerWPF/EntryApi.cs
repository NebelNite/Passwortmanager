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




        public async void deleteEntry(EntryModel selectedEntry)
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


                //user.entries.Remove(user.entries.Find(entry => entry.id == selectedEntry.id));



                //UserApi.GetInstance().updateUser(userDTO);

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Deleting Entry failed!");
            }
        }



        public async void editEntry(EntryDTO entryDto)
        {

            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();
                userDTO.id = user.id;

                UserApi userApi = UserApi.GetInstance();


                entryDto = EncryptEntry(entryDto);

                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/editEntry/" + userDTO.id, entryDto);
                response.EnsureSuccessStatusCode();

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Creating/Editing Entry failed!");
            }

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

                entryDto = EncryptEntry(entryDto);

                UserApi userApi = UserApi.GetInstance();

                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/" + user.id + "/addEntry", entryDto);
                response.EnsureSuccessStatusCode();


                UserApi.user = await UserApi.GetInstance().GetUserById(UserApi.user.id);

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Creating/Editing Entry failed!");
            }
        }

        public EntryDTO EncryptEntry(EntryDTO entry)
        {
            entry.notes = UserApi.EncryptMessage(entry.notes);
            entry.password = UserApi.EncryptMessage(entry.password);
            entry.username = UserApi.EncryptMessage(entry.username);
            entry.title = UserApi.EncryptMessage(entry.title);
            entry.url = UserApi.EncryptMessage(entry.url);

            return entry;

        }


        public static EntryDTO DecryptEntry(EntryDTO entry)
        {
            entry.notes = UserApi.DecryptMessage(entry.notes);
            entry.password = UserApi.DecryptMessage(entry.password);
            entry.username = UserApi.DecryptMessage(entry.username);
            entry.title = UserApi.DecryptMessage(entry.title);
            entry.url = UserApi.DecryptMessage(entry.url);

            return entry;
        }




        public static List<EntryModel> EncryptEntries(List<EntryModel> entries)
        {
            foreach (EntryModel entry in entries)
            {
                entry.notes = UserApi.EncryptMessage(entry.notes);
                entry.password = UserApi.EncryptMessage(entry.password);
                entry.username = UserApi.EncryptMessage(entry.username);
                entry.title = UserApi.EncryptMessage(entry.title);
                entry.url = UserApi.EncryptMessage(entry.url);
            }

            return entries;
        }


        public static List<EntryModel> DecryptEntries(List<EntryModel> entries)
        {
            foreach (EntryModel entry in entries)
            {
                entry.notes = UserApi.DecryptMessage(entry.notes);
                entry.password = UserApi.DecryptMessage(entry.password);
                entry.username = UserApi.DecryptMessage(entry.username);
                entry.title = UserApi.DecryptMessage(entry.title);
                entry.url = UserApi.DecryptMessage(entry.url);
            }

            return entries;
        }




    }
}
