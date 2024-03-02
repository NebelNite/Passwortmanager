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

namespace PasswortmanagerWPF
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        UserModel user;

        public MainWindow(UserModel user)
        {
            InitializeComponent();

            this.user = user;
            this.Closed += Window_Closed;

        }

        private void Window_Closed(object sender, EventArgs e)
        {
            // logout User

        }


        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;

            // Erstelle das Dropdown-Menü
            ContextMenu menu = new ContextMenu();

            // Füge MenuItem-Elemente zum Dropdown-Menü hinzu
            MenuItem placeholder1MenuItem = new MenuItem();
            placeholder1MenuItem.Header = "Placeholder1";
            menu.Items.Add(placeholder1MenuItem);

            MenuItem placeholder2MenuItem = new MenuItem();
            placeholder2MenuItem.Header = "Placeholder2";
            menu.Items.Add(placeholder2MenuItem);

            // Setze das Dropdown-Menü als Kontextmenü des Buttons
            button.ContextMenu = menu;

            // Öffne das Kontextmenü
            menu.IsOpen = true;
        }




    }
}
