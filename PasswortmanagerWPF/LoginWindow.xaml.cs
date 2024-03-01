using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

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

            // Hier können Sie den Code für die Registrierung (SignUp) implementieren
            // Zum Beispiel: Eine Methode aufrufen, um den Benutzer in der Datenbank zu registrieren
            // oder die Daten in einer Datei zu speichern.
        }

        private void SignInButton_Click(object sender, RoutedEventArgs e)
        {
            string username = SignInUsername.Text;
            string masterkey = SignInMasterkey.Password;

            // Hier können Sie den Code für die Anmeldung (SignIn) implementieren
            // Zum Beispiel: Überprüfen, ob die Benutzerdaten in der Datenbank vorhanden sind
            // oder ob die eingegebenen Daten korrekt sind.
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
