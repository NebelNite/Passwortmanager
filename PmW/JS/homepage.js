import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { EntryModel } from "../Class/EntryModel.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";


document.addEventListener('DOMContentLoaded', () => {
  
    const app = document.getElementById('app');
    const dataGrid = document.getElementById('data-grid');
    const menuItems = document.querySelectorAll('#menu a');
    const contextMenu = document.getElementById('context-menu');
    
    const editEntryBtn = document.getElementById('editEntry');
    const deleteEntryBtn = document.getElementById('deleteEntry');
    const addEntryBtn = document.getElementById('addEntry');
    const entryButton = document.getElementById('entry-button');
    const fileButton = document.getElementById('file-button');
    const fileMenu = document.getElementById('file-menu');
    const entryMenu = document.getElementById('entry-menu');
    
/*
    function toggleEntryMenu() {
      var entryMenu = document.getElementById('entry-menu');
      if (entryMenu.style.display === 'block') {
          entryMenu.style.display = 'none';
      } else {
          entryMenu.style.display = 'block';
      }
  }

  function toggleFileMenu() {
    var fileMenu = document.getElementById('file-menu');
    if (fileMenu.style.display === 'block') {
        fileMenu.style.display = 'none';
    } else {
        fileMenu.style.display = 'block';
    }
}
  
*/

    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('id');
    userId = decodeURIComponent(userId);
    
    //let userApi = UserApi.getInstance(getAesKeyForUser(username));
    
    UserApi.user = UserApi.getUserById(userId);
    
    
    function getAesKeyForUser(username) {
  
      const base64Key = localStorage.getItem(username);
    
      if (!base64Key) {
        return null;
      }
    
      return base64Key;i
    }
    

    
entryButton.addEventListener('click', function () {
    entryMenu.classList.toggle('hidden');
    
    if (!fileMenu.classList.contains('hidden')) {
      fileMenu.classList.add('hidden');
    }

});


fileButton.addEventListener('click', function () {
  fileMenu.classList.toggle('hidden');

  if (!entryMenu.classList.contains('hidden')) {
    entryMenu.classList.add('hidden');
  }
});

    
    editEntryBtn.addEventListener('click', function(){

        UserApi.getInstance().editEntry();
    });
    deleteEntryBtn.addEventListener('click', function(){

        UserApi.getInstance().deleteEntry();
    });
    addEntryBtn.addEventListener('click', function(){
      
        UserApi.getInstance().addEntry();
    });

    


        // Zeige das ContextMenu an der Mausposition an
        const showContextMenu = (event, menuId) => {
            
            event.preventDefault();
            const contextMenu = document.getElementById(menuId);

            contextMenu.style.display = 'block';
            contextMenu.style.left = `${event.clientX}px`;
            contextMenu.style.top = `${event.clientY}px`;
        };
        
        // Verstecke das ContextMenu
        const hideContextMenu = () => {
            const contextMenus = document.querySelectorAll('.context-menu');
            contextMenus.forEach(menu => menu.style.display = 'none');
        };

        // Füge einen Listener für Klicks auf den DataGrid hinzu
        dataGrid.addEventListener('contextmenu', event => showContextMenu(event, 'entry-menu'));
        dataGrid.addEventListener('click', hideContextMenu);
        

        // Füge einen Listener für Klicks auf die Menüelemente hinzu
        menuItems.forEach(item => item.addEventListener('click', hideContextMenu));
        
        
        let myEntry = new Entry("My Title", "myUsername", "myPassword", "www.example.com", "These are some notes","1");
        // Beispieldaten für die Tabelle
        const dataItems = [
            myEntry,
            myEntry
        ];

        


        // Binde die Daten an den DataGrid
        const dataGridSource = new Proxy({
            get length() {
                return dataItems.length;
            },
            getItem(index) {
                if (index < 0 || index >= dataItems.length) {
                    return null;
                }
                return dataItems[index];
            }
        }, {
            ownKeys() {
                return Array.from({ length: dataItems.length }, (_, i) => i);
            }
        });

        const table = dataGrid.querySelector('table');
        const tbody = table.querySelector('tbody');

        for (let i = 0; i < dataItems.length; i++) {
            const item = dataItems[i];

            const tr = document.createElement('tr');

            for (const key in item) {
                const td = document.createElement('td');
                td.textContent = item[key];
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
        

        // Füge Daten an den DataGrid an
        // table.dataset.dataSource = JSON.stringify(dataGridSource);

        // Behandle die Sortierung
        const ths = table.querySelectorAll('thead th');
        ths.forEach(th => th.addEventListener('click', () => {
            const order = th.dataset.order === 'asc' ? 'desc' : 'asc';
            th.dataset.order = order;

            const sortedDataItems = Array.from(dataItems).sort((a, b) => {
                if (order === 'asc') {
                    return a[th.textContent.toLowerCase()] > b[th.textContent.toLowerCase()] ? 1 : -1;
                } else {
                    return a[th.textContent.toLowerCase()] < b[th.textContent.toLowerCase()] ? 1 : -1;
                }
            });

            // Lösche die aktuellen Zeilen
            tbody.innerHTML = '';

            // Füge die sortierten Daten an den DataGrid an
            for (let i = 0; i < sortedDataItems.length; i++) {
                const item = sortedDataItems[i];

                const tr = document.createElement('tr');

                for (const key in item) {
                    const td = document.createElement('td');
                    td.textContent = item[key];
                    tr.appendChild(td);
                }

                tbody.appendChild(tr);
            }
        }));
    });

    















    



















