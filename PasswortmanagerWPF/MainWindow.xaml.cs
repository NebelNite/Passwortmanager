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

namespace PasswortmanagerWPF
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        private ObservableCollection<EntryModel> entries = new ObservableCollection<EntryModel>();
        private EntryModel selectedEntry;
        private byte[] aesKey;


        public MainWindow(UserModel user)
        {
            InitializeComponent();

            this.Icon = new BitmapImage(new Uri("MainIcon.ico", UriKind.Relative));
            leftBack.ImageSource = new BitmapImage(new Uri("leftBack2.png", UriKind.Relative));

            UserApi.user = user;
            aesKey = GetAesKeyForUser(user.username);


            string a = EncryptMessage("Mess", aesKey);

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





        private byte[] GetAesKeyForUser(string username)
        {
            var credential = new Credential
            {
                Target = "AESKey",
                Username = username
            };

            if (credential.Load())
            {
                string aesKeyBase64 = credential.Password;
                byte[] aesKey = Convert.FromBase64String(aesKeyBase64);

                // Verwende den AES-Schlüssel für weitere Operationen
                // In diesem Beispiel geben wir den Schlüssel einfach aus

                return aesKey;
            }
            else
            {
                Console.WriteLine("Der AES-Schlüssel wurde nicht gefunden.");
            }

            return null;
        }



        static byte[] EncryptMessage(string message, byte[] aesKey)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = aesKey;

                // Verschlüssele die Nachricht
                ICryptoTransform encryptor = aes.CreateEncryptor();
                byte[] encryptedBytes = encryptor.TransformFinalBlock(
                    System.Text.Encoding.UTF8.GetBytes(message), 0, message.Length);

                return encryptedBytes;
            }
        }

        static string DecryptMessage(byte[] encryptedMessage, byte[] aesKey)
        {
            using (Aes aes = Aes.Create())
            {
                aes.Key = aesKey;

                // Entschlüssele die Nachricht
                ICryptoTransform decryptor = aes.CreateDecryptor();
                byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedMessage, 0, encryptedMessage.Length);
                string decryptedMessage = System.Text.Encoding.UTF8.GetString(decryptedBytes);

                return decryptedMessage;
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
