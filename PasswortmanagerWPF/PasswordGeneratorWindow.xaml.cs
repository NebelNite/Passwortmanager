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
using PasswordGenerator;

namespace PasswortmanagerWPF
{
    /// <summary>
    /// Interaktionslogik für PasswordGenerator.xaml
    /// </summary>
    public partial class PasswordGeneratorWindow : Window
    {
        public PasswordGeneratorWindow()
        {
            InitializeComponent();
        }


        public event EventHandler<string> PasswordGenerated;


        private string GeneratePassword()
        {
            Password password = new Password(includeLowercase: lowercaseCheckBox.IsChecked.GetValueOrDefault(), includeUppercase: uppercaseCheckBox.IsChecked.GetValueOrDefault(), includeNumeric: numericCheckBox.IsChecked.GetValueOrDefault(), includeSpecial: specialCheckBox.IsChecked.GetValueOrDefault(), passwordLength: Convert.ToInt32(lengthSlider.Value));
            return password.Next();
        }


        private void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {
            string password = GeneratePassword();
            PasswordGenerated?.Invoke(this, password);
            this.Close();
        }





    }
}
