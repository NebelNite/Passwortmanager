using PasswordGenerator;
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
    /// Interaktionslogik für PasswordInputWindow.xaml
    /// </summary>
    public partial class PasswordInputWindow : Window
    {


        public event EventHandler<Tuple<string, string>> FileInput;
        private string jsonString;

        public PasswordInputWindow(string jsonString = "")
        {
            InitializeComponent();
            this.jsonString = jsonString;
        }


        private void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {
            FileInput?.Invoke(this, new Tuple<string, string>(PasswordBox.Password, jsonString));
            this.Close();
        }
    }
}
