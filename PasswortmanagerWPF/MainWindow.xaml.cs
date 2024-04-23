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
using PasswordGenerator;

namespace PasswortmanagerWPF
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        private ObservableCollection<EntryModel> entries = new ObservableCollection<EntryModel>();
        private EntryModel selectedEntry;

<<<<<<< HEAD
=======
        
>>>>>>> parent of c042a07 (NodeJS + ReadMe)

        public MainWindow(UserModel user)
        {
            InitializeComponent();

            this.Icon = new BitmapImage(new Uri("MainIcon.ico", UriKind.Relative));
            leftBack.ImageSource = new BitmapImage(new Uri("leftBack2.png", UriKind.Relative));
            this.Title = "Passwortmanager";

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
            PasswordInputWindow passwordInputWindow = new PasswordInputWindow();
            passwordInputWindow.Show();

            passwordInputWindow.FileInput += PasswordInputWindow_FileInput;
        }


        private async void PasswordInputWindow_FileInput(object sender, Tuple<string, string> data)
        {

            string password = data.Item1;

            // import
            if (data.Item2.Length >= 1)
            {
                string jsonString = data.Item2;

                List<EntryModel> currentEntries = entries.ToList();
                UserModel importedUser = null;

                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                passwordBytes = fillKey(passwordBytes);

                jsonString = UserApi.DecryptMessage(jsonString, passwordBytes);

                importedUser = JsonConvert.DeserializeObject<UserModel>(jsonString);

                currentEntries.AddRange(importedUser.entries);



                EntryDTO entryDTO = new EntryDTO();

                for (int i = 0; i < importedUser.entries.Count(); i++)
                {

                    EntryModel entry = importedUser.entries[i];

                    // id
                    Guid newId = Guid.NewGuid();
                    string idAsString = newId.ToString();
                    entryDTO.id = idAsString;
                    entryDTO.id = idAsString;

                    entryDTO.notes = entry.notes;
                    entryDTO.url = entry.url;
                    entryDTO.password = entry.password;
                    entryDTO.username = entry.username;
                    entryDTO.title = entry.title;

                    UserApi.user.entries.Add(entry);
                    EntryApi.GetInstance().createEntry(entryDTO);

                    //EntryApi.GetInstance().createEntry(entryDTO);
                }

                string id = UserApi.user.id;

                UserApi.user = await UserApi.GetInstance().GetUserById(id);

                currentEntries = EntryApi.DecryptEntries(UserApi.user.entries);

                /*
                foreach(EntryModel entry in importedUser.entries)
                {
                    EntryApi.GetInstance().createEntry(entryDTO);
                }
                */



                entries = new ObservableCollection<EntryModel>(currentEntries);

                dataGrid.ItemsSource = entries;
                await Console.Out.WriteLineAsync();

            }
            else
            {

                //UserModel decryptedUser = (UserModel)UserApi.DecryptUser(UserApi.user);
                //UserModel decryptedUser = (UserModel)UserApi.user;

                JsonSerializerSettings settings = new JsonSerializerSettings
                {
                    Formatting = Formatting.Indented
                };

                string jsonString = JsonConvert.SerializeObject(UserApi.user, settings);

                if (!Directory.Exists("Exports"))
                {
                    Directory.CreateDirectory("Exports");
                }



                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                passwordBytes = fillKey(passwordBytes);
                jsonString = UserApi.EncryptMessage(jsonString, passwordBytes);


                /*
                password = "password";
                passwordBytes = Encoding.UTF8.GetBytes(password);
                passwordBytes = fillKey(passwordBytes);
                jsonString = UserApi.DecryptMessage(jsonString, passwordBytes);
                */


                File.WriteAllText("Exports/entries(" + UserApi.user.id + ").json", jsonString);

            }

        }


        private byte[] fillKey(byte[] passwordBytes)
        {
            if (passwordBytes.Length <= 32)
            {
                byte[] paddedPassword = new byte[32];
                Array.Copy(passwordBytes, paddedPassword, passwordBytes.Length);
                passwordBytes = paddedPassword;
            }
            return passwordBytes;
        }

        private void ImportEntries_Click(object sender, EventArgs e)
        {
            string jsonString = "";

            var openFileDialog = new Microsoft.Win32.OpenFileDialog
            {
                Filter = "JSON Files (*.json)|*.json",
                Title = "Select the JSON file to import"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                jsonString = File.ReadAllText(openFileDialog.FileName);
            }


            PasswordInputWindow passwordInputWindow = new PasswordInputWindow(jsonString);
            passwordInputWindow.Show();
            passwordInputWindow.FileInput += PasswordInputWindow_FileInput;


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
