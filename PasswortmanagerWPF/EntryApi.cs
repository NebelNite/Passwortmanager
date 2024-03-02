using SharedLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using SharedLibrary;
using System.Windows;

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


        public async void createEntry(EntryDTO entryDto)
        {
            try
            {
                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/create", entryDto);
                response.EnsureSuccessStatusCode();

                //EntryModel entryModel = await response.Content.ReadAsAsync<EntryModel>();
                UserModel entryModel = await response.Content.ReadAsAsync<UserModel>();
                // Hier können Sie mit entryModel arbeiten oder das Ergebnis anderweitig verwenden
                EntryCreated?.Invoke(this, entryModel);

            }
            catch (Exception ex)
            {
                MessageBox.Show("Editing Entry failed!");
            }
        }



    }
}
