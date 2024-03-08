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

        int pwdLength;
        bool lowerC = true, upperC = true, numbers = false, specialC = false;

        private void uppercaseCheckBox_Checked(object sender, RoutedEventArgs e)
        {
            if (uppercaseCheckBox.IsChecked == true)
            {
                upperC = true;
            }
            else
            {
                upperC = false;
            }
        }

        private void numericCheckBox_Checked(object sender, RoutedEventArgs e)
        {
            if (numericCheckBox.IsChecked == true)
            {
                numbers = true;
            }
            else
            {
                numbers = false;
            }
        }

        private void specialCheckBox_Checked(object sender, RoutedEventArgs e)
        {
            if (specialCheckBox.IsChecked == true)
            {
                specialC = true;
            }
            else
            {
                specialC = false;
            }
        }

        private void lowercaseCheckBox_Checked(object sender, RoutedEventArgs e)
        {
            if (lowercaseCheckBox.IsChecked == true)
            {
                lowerC = true;
            }
            else
            {
                lowerC = false;
            }
        }

        public void GeneratePassword()
        {

            Password password = new Password(includeLowercase: lowerC, includeUppercase: upperC, includeNumeric: numbers, includeSpecial: specialC, passwordLength: pwdLength);
            string strPassword = password.Next();

        }

        private void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {
            GeneratePassword();
            this.Close();
        }


    }
}
