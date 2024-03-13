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
using System.Windows;
using System.Runtime.CompilerServices;

namespace PasswortmanagerWPF
{
    internal class UserApi : LoginApi
    {
        private static UserApi instance;
        public static UserModel user;
        public static byte[] aesKey;

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

            HttpResponseMessage response = null;

            try
            {
                response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/create", userDto);
                response.EnsureSuccessStatusCode();
                var createdUser = await response.Content.ReadAsAsync<UserModel>();

                MessageBox.Show("Benutzer erfolgreich erstellt! " + Char.ConvertFromUtf32(0x1F480));
                return createdUser;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Username ist bereits vergeben!");

            }


            return null;
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

        public async Task<UserModel> GetUserByUsernameAndMasterKey(UserDTO userDto)
        {

            var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/getUserByUsernameAndMasterKey", userDto);
            response.EnsureSuccessStatusCode();

            // Antwort des Servers lesen und in ein UserModel-Objekt deserialisieren
            return await response.Content.ReadAsAsync<UserModel>();
        }





        public static string EncryptMessage(string message)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = aesKey;

                // Verschlüssele die Nachricht
                ICryptoTransform encryptor = aes.CreateEncryptor();
                byte[] encryptedBytes = encryptor.TransformFinalBlock(
                    System.Text.Encoding.UTF8.GetBytes(message), 0, message.Length);

                string encryptedString = Convert.ToBase64String(encryptedBytes);

                return encryptedString;
            }
        }

        public static string DecryptMessage(string encryptedMessage)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = aesKey;

                // Decrypt the message
                ICryptoTransform decryptor = aes.CreateDecryptor();
                byte[] encryptedBytes = Convert.FromBase64String(encryptedMessage);
                byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
                string decryptedMessage = System.Text.Encoding.UTF8.GetString(decryptedBytes);

                return decryptedMessage;
            }
        }





        /*
        public static string EncryptMessage(string message)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = aesKey;
                aes.GenerateIV();

                // Verschlüssele die Nachricht
                ICryptoTransform encryptor = aes.CreateEncryptor();
                byte[] encryptedBytes = encryptor.TransformFinalBlock(
                    System.Text.Encoding.UTF8.GetBytes(message), 0, message.Length);


                // Speichere den IV vor den verschlüsselten Daten
                byte[] iv = aes.IV;
                byte[] encryptedBytesWithIV = new byte[iv.Length + encryptedBytes.Length];
                Array.Copy(iv, 0, encryptedBytesWithIV, 0, iv.Length);
                Array.Copy(encryptedBytes, 0, encryptedBytesWithIV, iv.Length, encryptedBytes.Length);


                string encryptedString = Convert.ToBase64String(encryptedBytesWithIV);

                return encryptedString;
            }
        }


        public static string DecryptMessage(string encryptedMessage)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = aesKey;

                // Extrahiere den IV aus den verschlüsselten Daten

                byte[] iv = new byte[aes.BlockSize / 8];
                byte[] encryptedMessageBytes = Convert.FromBase64String(encryptedMessage);
                Array.Copy(encryptedMessageBytes, 0, iv, 0, iv.Length);
                aes.IV = iv;

                // Entferne den IV aus den verschlüsselten Daten
                byte[] encryptedMessageWithoutIV = new byte[encryptedMessageBytes.Length - iv.Length];
                Array.Copy(encryptedMessageBytes, iv.Length, encryptedMessageWithoutIV, 0, encryptedMessageWithoutIV.Length);



                // Entschlüssele die Nachricht
                ICryptoTransform decryptor = aes.CreateDecryptor();
                byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedMessageWithoutIV, 0, encryptedMessageWithoutIV.Length);
                string decryptedMessage = System.Text.Encoding.UTF8.GetString(decryptedBytes);


                return decryptedMessage;
            }
        }
        */





    }

}
