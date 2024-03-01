using System;
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
        }


        private void SignUpButton_Click(object sender, RoutedEventArgs e)
        {
            string username = SignUpUsername.Text;
            string masterkey = SignUpMasterkey.Password;

            UserApi userApi = new UserApi(new HttpClient());

            UserDTO userDTO = new UserDTO();
            userDTO.masterKey = masterkey;
            userDTO.username = username;

            userApi.CreateUserAsync(userDTO);

        }

        private void SignInButton_Click(object sender, RoutedEventArgs e)
        {
            string username = SignInUsername.Text;
            string masterkey = SignInMasterkey.Password;

            UserApi userApi = new UserApi(new HttpClient());

            UserDTO userDTO = new UserDTO();
            userDTO.masterKey = masterkey;
            userDTO.username = username;


            try
            {
                UserModel user = await userApi.AuthenticateUserAsync(userDTO);
                // If authentication is successful, you can navigate to the next window or perform other actions as needed
                MainWindow mainWindow = new MainWindow(user);
                mainWindow.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                // Handle authentication errors or other exceptions as needed
                MessageBox.Show("Authentication failed. Please check your credentials and try again.");
            }

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
