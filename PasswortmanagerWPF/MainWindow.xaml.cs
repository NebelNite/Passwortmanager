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

        private ObservableCollection<EntryModel> entries = new ObservableCollection<EntryModel>();
        private EntryModel selectedEntry;
        private int selectedEntryIndex;

        public MainWindow(UserModel user)
        {
            InitializeComponent();

            this.Icon = new BitmapImage(new Uri("MainIcon.ico", UriKind.Relative));
            leftBack.ImageSource = new BitmapImage(new Uri("leftBack2.png", UriKind.Relative));

            UserApi.user = user;

            this.Loaded += MainWindow_Loaded;

            //this.Closed += Window_Closed

        }





        private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {

            categoryRoot.Header = "DB: " + UserApi.user.username;

            UserDTO userDTO = new UserDTO();

            userDTO.username = UserApi.user.username;
            userDTO.masterKey = UserApi.user.masterKey;
            userDTO.id = UserApi.user.id;
            userDTO.entries = UserApi.user.entries;

            UserModel user = await UserApi.GetInstance().GetUserByUsernameAndMasterKey(userDTO);

            entries = new ObservableCollection<EntryModel>(user.entries);

            dataGrid.ItemsSource = entries;
        }


        private void Window_Closed(object sender, EventArgs e)
        {

        }


        private void EditMenuItem_Click(object sender, EventArgs e)
        {

            EntryWindow entryWindow = new EntryWindow(selectedEntry);

            //EntryApi.GetInstance().EntryCreated += EntryWindow_EntryCreated;
            entryWindow.Show();

        }
        private void DeleteMenuItem_Click(object sender, EventArgs e)
        {
            EntryApi.GetInstance().deleteEntry(selectedEntry);
        }

        private void LockManager_Click(object sender, EventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            this.Closed += (s, args) => loginWindow.ShowDialog();
            this.Close();

        }



        private async void EntryWindow_EntryCreated(object sender, UserModel userModel)
        {

            UserDTO userDTO = new UserDTO();

            userDTO.username = UserApi.user.username;
            userDTO.masterKey = UserApi.user.masterKey;
            userDTO.id = UserApi.user.id;
            userDTO.entries = UserApi.user.entries;

            UserModel user = await UserApi.GetInstance().GetUserByUsernameAndMasterKey(userDTO);
            UserApi.user = user;

            entries = new ObservableCollection<EntryModel>(user.entries);
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
                selectedEntry = (EntryModel)dataGrid.SelectedItem;
                selectedEntryIndex = dataGrid.SelectedIndex;
                footer.Text = selectedEntry.ToString();

            }
        }
    }
}
