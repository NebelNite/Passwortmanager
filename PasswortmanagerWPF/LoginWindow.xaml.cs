﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Net.Http;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using SharedLibrary;
using System.Text.RegularExpressions;
using System.Net.PeerToPeer;
using System.Security.Cryptography;
using System.IO.Packaging;
using System.Net;
using CredentialManagement;

namespace PasswortmanagerWPF
{
    /// <summary>
    /// Interaktionslogik für LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
            this.Icon = new BitmapImage(new Uri("LoginIcon.ico", UriKind.Relative));

        }



        private void SignUpButton_Click(object sender, RoutedEventArgs e)
        {

            string username = SignUpUsername.Text;
            string masterkey = SignUpMasterkey.Password;

            string msg = IsValidPassword(masterkey);


            if (string.IsNullOrEmpty(msg))
            {
                UserApi userApi = UserApi.GetInstance();
                UserDTO userDTO = new UserDTO();

                if (!AesKeyExistsForUser(username))
                {
                    SetAesKeyForUser(username);
                }

                UserApi.aesKey = GetAesKeyForUser(userDTO.username);


                userDTO.masterKey = UserApi.EncryptMessage(masterkey);
                userDTO.username = UserApi.EncryptMessage(username);

                try
                {

                    userApi.CreateUserAsync(userDTO);


                }
                catch (Exception ex)
                {
                    MessageBox.Show("SignUp failed!" + Char.ConvertFromUtf32(0x1F480));
                }

            }
            else
            {
                MessageBox.Show(msg);
            }
        }


        private void SetAesKeyForUser(string username)
        {
            // Generate a new AES key
            Aes aes = Aes.Create();
            aes.GenerateKey();

            byte[] aesKey = aes.Key;

            // Convert the AES key to a base64 string
            string aesKeyBase64 = Convert.ToBase64String(aesKey);



            Credential credentialSet = new Credential
            {
                Target = "AESKey",
                Username = username,
                Password = aesKeyBase64,
                PersistanceType = PersistanceType.LocalComputer
            };

            credentialSet.Save();
        }



        private byte[] GetAesKeyForUser(string username)
        {
            var credential = new Credential
            {
                Target = "AESKey",
                Username = username
            };

            if (credential.Load())
            {
                string aesKeyBase64 = credential.Password;
                byte[] aesKey = Convert.FromBase64String(aesKeyBase64);

                // Verwende den AES-Schlüssel für weitere Operationen
                // In diesem Beispiel geben wir den Schlüssel einfach aus

                return aesKey;
            }
            else
            {
                Console.WriteLine("Der AES-Schlüssel wurde nicht gefunden.");
            }

            return null;
        }

        private bool AesKeyExistsForUser(string username)
        {
            var credential = new Credential
            {
                Target = "AESKey",
                Username = username
            };

            return credential.Load();
        }




        private async void SignInButton_Click(object sender, RoutedEventArgs e)
        {

            UserDTO userDTO = new UserDTO();
            userDTO.masterKey = SignInMasterkey.Password;
            userDTO.username = SignInUsername.Text;

            try
            {

                UserApi.aesKey = GetAesKeyForUser(userDTO.username);

                userDTO.masterKey = UserApi.EncryptMessage(userDTO.masterKey);
                userDTO.username = UserApi.EncryptMessage(userDTO.username);


                UserModel user = await UserApi.GetInstance().AuthenticateUserAsync(userDTO);




                MainWindow mainWindow = new MainWindow(user);
                mainWindow.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Authentication failed. Please check your credentials and try again.");
            }

        }



        private string IsValidPassword(string masterkey)
        {
            string output = string.Empty;
            string nonSpecialCharacters = @"[^A-Za-z0-9]";
            Regex regex = new Regex(nonSpecialCharacters);

            /*
            if (masterkey.Length < 10)
            {
                output += "At least: 10 characters" + Environment.NewLine;
            }

            if (!regex.IsMatch(masterkey))
            {
                output += "At least: 1 special character" + Environment.NewLine;
            }
            */
            return output;

        }



        private void TextBox_GotFocus(object sender, RoutedEventArgs e)
        {
            TextBox textBox = (TextBox)sender;
            if (textBox.Text == "Enter Username")
            {
                textBox.Text = "";
            }
        }

        private void TextBox_LostFocus(object sender, RoutedEventArgs e)
        {
            TextBox textBox = (TextBox)sender;
            if (string.IsNullOrWhiteSpace(textBox.Text))
            {
                textBox.Text = "Enter Username";
            }
        }




    }
}
