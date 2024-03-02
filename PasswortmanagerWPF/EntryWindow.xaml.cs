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
        public EntryWindow()
        {
            InitializeComponent();
        }

        private void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {


            EntryDTO entryDTO = new EntryDTO();

            entryDTO.title = titleTextBox.Text;
            entryDTO.username = usernameTextBox.Text;
            entryDTO.password = passwordTextBox.Text;
            entryDTO.url = urlTextBox.Text;
            entryDTO.notes = notesTextBox.Text;


            EntryApi.GetInstance().createEntry(entryDTO);

            this.Close();

        }





    }
}
