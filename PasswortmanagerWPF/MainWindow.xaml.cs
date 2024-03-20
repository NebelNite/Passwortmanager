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
using CredentialManagement;
using System.Security.Cryptography;
using Newtonsoft.Json;
using System.IO;

namespace PasswortmanagerWPF
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        private ObservableCollection<EntryModel> entries = new ObservableCollection<EntryModel>();
        private EntryModel selectedEntry;


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

            categoryRoot.Header = "DB: " + UserApi.DecryptMessage(UserApi.user.username);

            UserDTO userDTO = new UserDTO();

            userDTO.username = UserApi.user.username;
            userDTO.masterKey = UserApi.user.masterKey;
            userDTO.id = UserApi.user.id;
            userDTO.entries = UserApi.user.entries;


            userDTO = (UserDTO)UserApi.DecryptUser(userDTO);

            //UserModel user = await UserApi.GetInstance().GetUserByUsernameAndMasterKey(userDTO);
            UserModel user = await UserApi.GetInstance().GetUserById(userDTO.id);

            entries = new ObservableCollection<EntryModel>(EntryApi.DecryptEntries(user.entries));

            dataGrid.ItemsSource = entries;
        }


        private void Window_Closed(object sender, EventArgs e)
        {

        }


        private void ExportEntries_Click(object sender, EventArgs e)
        {


            // Passwortgeschützt


            UserModel decryptedUser = (UserModel)UserApi.DecryptUser(UserApi.user);

            JsonSerializerSettings settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };

            string jsonString = JsonConvert.SerializeObject(decryptedUser, settings);


            if (!Directory.Exists("Exports"))
            {
                Directory.CreateDirectory("Exports");
            }

            string password = "password";
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);


            if (passwordBytes.Length <= 32)
            {
                byte[] paddedPassword = new byte[32];
                Array.Copy(passwordBytes, paddedPassword, passwordBytes.Length);
                passwordBytes = paddedPassword;
            }


            jsonString = UserApi.EncryptMessage(jsonString, passwordBytes);

            /*
            if (passwordBytes.Length == 32)
            {
                passwordBytes = TrimLeadingZeros(passwordBytes);
            }*/


            jsonString = UserApi.DecryptMessage(jsonString, passwordBytes);



            File.WriteAllText("Exports/entries(" + decryptedUser.username + ").json", jsonString);
        }

        private byte[] TrimLeadingZeros(byte[] input)
        {
            int index = 0;
            // Finden des ersten nicht-Null-Bytes
            while (index < input.Length && input[index] == 0)
            {
                index++;
            }
            // Wenn index größer als 0 ist, gibt es führende Nullen, daher wird das Array zugeschnitten
            if (index > 0)
            {
                byte[] trimmedArray = new byte[input.Length - index];
                Array.Copy(input, index, trimmedArray, 0, trimmedArray.Length);
                return trimmedArray;
            }
            // Wenn index gleich 0 ist, gibt es keine führenden Nullen, daher wird das Eingabearray unverändert zurückgegeben
            return input;
        }



        private void ImportEntries_Click(object sender, EventArgs e)
        {

            List<EntryModel> currentEntries = entries.ToList();
            UserModel importedUser = null;

            var openFileDialog = new Microsoft.Win32.OpenFileDialog
            {
                Filter = "JSON Files (*.json)|*.json",
                Title = "Select the JSON file to import"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                string jsonString = File.ReadAllText(openFileDialog.FileName);

                importedUser = JsonConvert.DeserializeObject<UserModel>(jsonString);

                currentEntries.AddRange(importedUser.entries);

            }

            EntryDTO entryDTO = new EntryDTO();


            for (int i = 0; i < importedUser.entries.Count(); i++)
            {

                EntryModel entry = importedUser.entries[i];

                entryDTO.notes = entry.notes;
                entryDTO.password = entry.password;
                entryDTO.username = entry.username;
                entryDTO.title = entry.title;

                EntryApi.GetInstance().createEntry(entryDTO);
            }


            entries = new ObservableCollection<EntryModel>(currentEntries);

            dataGrid.ItemsSource = entries;

        }

        private void DeleteEntry_Click(object sender, EventArgs e)
        {
            EntryApi.GetInstance().deleteEntry(selectedEntry);

            EntryApi.GetInstance().EntryCreated += EntryWindow_EntryCreated;

            /*
            entries = new ObservableCollection<EntryModel>(user.entries);

            dataGrid.ItemsSource = entries;*/
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





            //UserModel user = await UserApi.GetInstance().GetUserByUsernameAndMasterKey(userDTO);
            UserModel user = await UserApi.GetInstance().GetUserById(userDTO.id);

            UserApi.user = user;


            userDTO.entries = EntryApi.DecryptEntries(user.entries);

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

            EntryWindow entryWindow = new EntryWindow(selectedEntry);
            EntryApi.GetInstance().EntryCreated += EntryWindow_EntryCreated;
            entryWindow.Show();
        }


        private void dataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (dataGrid.SelectedItem != null)
            {
                selectedEntry = (EntryModel)dataGrid.SelectedItem;
                footer.Text = selectedEntry.ToString();

            }
        }


























        private void dataGrid_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {

            // Get the DataGridCell that was double-clicked
            DataGridCell cell = GetCell(sender, e);


            if (cell != null)
            {
                cell.IsSelected = true;


                string[] cellValue = cell.ToString().Split(new string[] { "Cell: " }, StringSplitOptions.RemoveEmptyEntries);

                if (cellValue.Length == 2)
                    Clipboard.SetText(cellValue[1]);

            }

        }

        private DataGridCell GetCell(object sender, MouseButtonEventArgs e)
        {
            // Get the DataGrid that raised the event
            DataGrid dataGrid = sender as DataGrid;

            if (dataGrid != null)
            {
                // Get the DataGridRow that contains the cell
                DataGridRow row = FindAncestor<DataGridRow>((DependencyObject)e.OriginalSource);
                if (row != null)
                {
                    // Get the DataGridCell that contains the cell
                    DataGridCell cell = FindChild<DataGridCell>(row, c => c.IsFocused);
                    return cell;
                }
            }
            return null;
        }

        private static T FindAncestor<T>(DependencyObject dependencyObject) where T : DependencyObject
        {
            DependencyObject current = dependencyObject;
            while (current != null && current.GetType() != typeof(T))
            {
                current = VisualTreeHelper.GetParent(current);
            }
            return current as T;
        }

        private static T FindChild<T>(DependencyObject dependencyObject, Func<T, bool> predicate) where T : DependencyObject
        {
            if (dependencyObject == null)
            {
                return null;
            }

            int childrenCount = VisualTreeHelper.GetChildrenCount(dependencyObject);
            for (int i = 0; i < childrenCount; i++)
            {
                DependencyObject child = VisualTreeHelper.GetChild(dependencyObject, i);
                T result = child as T;
                if (result != null && predicate(result))
                {
                    return result;
                }

                result = FindChild<T>(child, predicate);
                if (result != null)
                {
                    return result;
                }
            }

            return null;
        }










    }
}
