using SharedLibrary;
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
    /// Interaktionslogik für Entry.xaml
    /// </summary>
    public partial class EntryWindow : Window
    {

        //private UserModel user;

        public EntryWindow()
        {
            InitializeComponent();
        }

        private bool edit = false;

        public EntryWindow(EntryModel entry)
        {
            InitializeComponent();

            titleTextBox.Text = entry.title;
            usernameTextBox.Text = entry.username;
            urlTextBox.Text = entry.url;
            notesTextBox.Text = entry.notes;
            passwordTextBox.Text = entry.password;

            edit = true;

        }

        private async void EntryWindow_Loaded(object sender, RoutedEventArgs e)
        {

        }

        private void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {


            EntryDTO entryDTO = new EntryDTO();

            entryDTO.title = titleTextBox.Text;
            entryDTO.username = usernameTextBox.Text;
            entryDTO.password = passwordTextBox.Text;
            entryDTO.url = urlTextBox.Text;
            entryDTO.notes = notesTextBox.Text;

            if (edit)
            {
                EntryApi.GetInstance().editEntry(entryDTO);
            }
            else
            {
                EntryApi.GetInstance().createEntry(entryDTO);
            }

            this.Close();

        }

        private void GeneratePassword_Click(object sender, RoutedEventArgs e)
        {
            PasswordGeneratorWindow passwordGeneratorWindow = new PasswordGeneratorWindow();
            passwordGeneratorWindow.Show();
        }


        private void TogglePasswordVisibility_Click(object sender, RoutedEventArgs e)
        {

        }

    }
}
