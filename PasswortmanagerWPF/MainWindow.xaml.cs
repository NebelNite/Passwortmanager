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
using System.Windows.Navigation;
using System.Windows.Shapes;
using SharedLibrary;
using System.Collections.ObjectModel;

namespace PasswortmanagerWPF
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        UserModel user;
        private ObservableCollection<EntryModel> entries = new ObservableCollection<EntryModel>();


        public MainWindow(UserModel user)
        {
            InitializeComponent();

            this.Icon = new BitmapImage(new Uri("MainIcon.ico", UriKind.Relative));
            this.user = user;
            categoryRoot.Header = "DB: " + user.username;
            //this.Closed += Window_Closed
            dataGrid.ItemsSource = entries;
        }

        private void Window_Closed(object sender, EventArgs e)
        {

        }


        private void LockManager_Click(object sender, EventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            this.Closed += (s, args) => loginWindow.ShowDialog();
            this.user = null;
            this.Close();

        }



        private void EntryWindow_EntryCreated(object sender, EntryModel entryModel)
        {
            entries.Add(entryModel);
            dataGrid.ItemsSource = entries;
        }



        private void AddEntry_Click(object sender, EventArgs e)
        {
            EntryWindow entryWindow = new EntryWindow();
            EntryApi.GetInstance().EntryCreated += EntryWindow_EntryCreated;
            entryWindow.Show();

        }


        private void EditEntry_Click(object sender, EventArgs e)
        {

        }

        private void dataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dataGrid.SelectedItem != null)
            {
                EntryModel selectedEntry = (EntryModel)dataGrid.SelectedItem;
                footer.Text = selectedEntry.ToString();

            }
        }
    }
}
