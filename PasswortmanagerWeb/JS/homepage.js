//import Entry from "./Entry"

document.addEventListener('DOMContentLoaded', () => {
    
    const app = document.getElementById('app');
    const dataGrid = document.getElementById('data-grid');
    const menuItems = document.querySelectorAll('#menu a');
    const contextMenu = document.getElementById('context-menu');

    const editEntryBtn = document.getElementById('editEntry');
    const deleteEntryBtn = document.getElementById('deleteEntry');
    const addEntryBtn = document.getElementById('addEntry');

    
    editEntryBtn.addEventListener('click', function(){

        UserApi.getInstance().editEntry();
    });
    deleteEntryBtn.addEventListener('click', function(){

        UserApi.getInstance().deleteEntry();
    });
    addEntryBtn.addEventListener('click', function(){



        UserApi.getInstance().editEntry();
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

    















    



























    class Entry {
        constructor(title, username, password, url, notes, id) {
          this.title = title;
          this.username = username;
          this.password = password;
          this.url = url;
          this.notes = notes;
          this.id = id;
        }
      
        
      get title() {
        return this._title;
      }
    
      set title(value) {
        this._title = value;
      }
    
      get username() {
        return this._username;
      }
    
      set username(value) {
        this._username = value;
      }
    
      get password() {
        return this._password;
      }
    
      set password(value) {
        this._password = value;
      }
    
      get url() {
        return this._url;
      }
    
      set url(value) {
        this._url = value;
      }
    
      get notes() {
        return this._notes;
      }
    
      set notes(value) {
        this._notes = value;
      }
    
      get id() {
        return this._id;
      }
    
      set id(value) {
        this._id = value;
      }
      
    }
    
    
    
    
    
    
    
    
    
    
    
    
    class LoginApi {
      constructor(httpClient, connectionString) {
        this._httpClient = httpClient;
        this._connectionString = connectionString;
      }
    
      getHttpClient() {
        return this._httpClient;
      }
    
      getConnectionString() {
        return this._connectionString;
      }
    }
    
    
    
    
    
    
    
    
    class UserApi extends LoginApi {
      constructor(httpClient, connectionString) {
        super(httpClient, connectionString);
        this.aesKey = null;
      }
    
      static getInstance() {
        if (UserApi.instance === null) {
          UserApi.instance = new UserApi(new HttpClient(), 'http://localhost:8080');
        }
    
        return UserApi.instance;
      }
    
      async createUser(userDto) {
        userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
    
        try {
          const response = await this.getHttpClient().post('/users/create', {
            body: JSON.stringify(userDto)
          });
    
          if (response.statusCode === 200) {
            const user = await response.json();
            MessageBox.show(`Benutzer erfolgreich erstellt! ${String.fromCodePoint(0x1F480)}`);
            return user;
          }
        } catch (error) {
          MessageBox.show('Username ist bereits vergeben!');
        }
    
        return null;
      }
    
      encodeMasterKey(secret) {
        const sha512 = new Hashes.SHA512();
        const hash = sha512.hex(secret);
        return hash.toLowerCase();
      }
    
      async authenticateUser(userDto) {
        userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
    
        const response = await this.getHttpClient().post('/users/authenticate', {
          body: JSON.stringify(userDto)
        });
    
        if (response.statusCode === 200) {
          const user = await response.json();
          this.aesKey = user.aesKey;
          UserApi.user = user;
          return user;
        }
    
        return null;
      }
    
      async getUserByUsernameAndMasterKey(userDto) {
        userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
    
        const response = await this.getHttpClient().post('/users/getUserByUsernameAndMasterKey', {
          body: JSON.stringify(userDto)
        });
    
        if (response.statusCode === 200) {
          return await response.json();
        }
    
        return null;
      }
    
      async getUserById(id) {
        const response = await this.getHttpClient().get(`/users/${id}`);
    
        if (response.statusCode === 200) {
          return await response.json();
        }
        
        return null;
      }
    
      encryptMessage(message, fileKey = null) {
        const aes = new Aes();
    
        if (fileKey !== null) {
          aes.key = fileKey;
        } else {
          aes.key = this.aesKey;
        }
    
        aes.mode = CipherMode.ECB;
    
        const encryptor = aes.createEncryptor();
        const encryptedBytes = encryptor.transformFinalBlock(
          Buffer.from(message, 'utf-8'), 0, message.length
        );
    
        const encryptedString = Buffer.from(encryptedBytes).toString('base64');
    
        return encryptedString;
      }
      
      decryptMessage(encryptedMessage, fileKey = null) {
        const aes = new Aes();
    
        if (fileKey !== null) {
          aes.key = fileKey;
        } else {
          aes.key = this.aesKey;
        }
      
        
        aes.mode = CipherMode.ECB;
        const decryptor = aes.createDecryptor();
    
        //const encryptedBytes = Buffer.from(
          const encryptedBytes = Buffer.from(encryptedMessage, 'base64');
    
          const decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
          decryptedMessage = System.Text.Encoding.UTF8.GetString(decryptedBytes);
    
          return decryptedMessage;
      }
    
      
    
    
    }
    
    
    
    
    
    
    
    
    
    
    const { MessageBox } = require('electron'); // Annahme: Verwendung von Electron für MessageBox
    
    // Definieren der EntryApi-Klasse
    class EntryApi extends LoginApi {
        constructor(httpClient, connectionString) {
            super(httpClient, connectionString);
            this.EntryCreated = null;
        }
    
        // Methode zum Abrufen einer Singleton-Instanz der EntryApi-Klasse
        static GetInstance() {
            if (!this.instance) {
                this.instance = new EntryApi(new HttpClient(), "http://localhost:8080");
            }
            return this.instance;
        }
        
    
        // Methode zum Löschen eines Eintrags
        async deleteEntry(selectedEntry) {
            try {
                const user = UserApi.user;
                const userDTO = new UserDTO();
                userDTO.username = user.username;
                userDTO.id = user.id;
                userDTO.masterKey = user.masterKey;
                userDTO.entries = user.entries;
    
                const response = await this.GetHttpClient().PostAsJsonAsync(this.GetConnectionString() + "/entries/delete/" + selectedEntry.id, userDTO);
                response.EnsureSuccessStatusCode();
    
                const entryCount = user.entries.length;
                for (let i = 0; entryCount === user.entries.length; i++) {
                    if (user.entries[i].id === selectedEntry.id) {
                        user.entries.splice(i, 1);
                    }
                }
    
                UserApi.user = user;
                this.EntryCreated?.(this, user);
            } catch (ex) {
                MessageBox.show("Deleting Entry failed!");
            }
        }
    
    
    
        async editEntry(entryDto) {
          try {
              const user = UserApi.user;
              const userDTO = new UserDTO();
              userDTO.id = user.id;
    
              const userApi = UserApi.GetInstance();
    
              entryDto = this.EncryptEntry(entryDto);
    
              const response = await this.GetHttpClient().PostAsJsonAsync(this.GetConnectionString() + "/entries/editEntry/" + userDTO.id, entryDto);
              response.EnsureSuccessStatusCode();
    
              this.EntryCreated?.(this, user);
          } catch (ex) {
              MessageBox.show("Creating/Editing Entry failed!");
          }
      }
    
      // Methode zum Erstellen eines Eintrags
      async createEntry(entryDto) {
          try {
              const user = UserApi.user;
              const userDTO = new UserDTO();
              userDTO.username = user.username;
              userDTO.id = user.id;
              userDTO.masterKey = user.masterKey;
              userDTO.entries = user.entries;
    
              entryDto = this.EncryptEntry(entryDto);
              
              const userApi = UserApi.GetInstance();
    
              const response = await this.GetHttpClient().PostAsJsonAsync(this.GetConnectionString() + "/users/" + user.id + "/addEntry", entryDto);
              response.EnsureSuccessStatusCode();
    
              UserApi.user = await UserApi.GetInstance().GetUserById(UserApi.user.id);
    
              this.EntryCreated?.(this, user);
          } catch (ex) {
              MessageBox.show("Creating/Editing Entry failed!");
          }
      }
    
      // Methode zum Verschlüsseln eines Eintrags
      EncryptEntry(entry) {
          entry.notes = UserApi.EncryptMessage(entry.notes);
          entry.password = UserApi.EncryptMessage(entry.password);
          entry.username = UserApi.EncryptMessage(entry.username);
          entry.title = UserApi.EncryptMessage(entry.title);
          entry.url = UserApi.EncryptMessage(entry.url);
    
          return entry;
      }
    
      // Methode zum Entschlüsseln eines Eintrags
      static DecryptEntry(entry) {
          entry.notes = UserApi.DecryptMessage(entry.notes);
          entry.password = UserApi.DecryptMessage(entry.password);
          entry.username = UserApi.DecryptMessage(entry.username);
          entry.title = UserApi.DecryptMessage(entry.title);
          entry.url = UserApi.DecryptMessage(entry.url);
    
          return entry;
      }
    
      // Methode zum Verschlüsseln einer Liste von Einträgen
      static EncryptEntries(entries) {
          for (const entry of entries) {
              entry.notes = UserApi.EncryptMessage(entry.notes);
              entry.password = UserApi.EncryptMessage(entry.password);
              entry.username = UserApi.EncryptMessage(entry.username);
              entry.title = UserApi.EncryptMessage(entry.title);
              entry.url = UserApi.EncryptMessage(entry.url);
          }
    
          return entries;
      }
    
      // Methode zum Entschlüsseln einer Liste von Einträgen
      static DecryptEntries(entries) {
          for (const entry of entries) {
              entry.notes = UserApi.DecryptMessage(entry.notes);
              entry.password = UserApi.DecryptMessage(entry.password);
              entry.username = UserApi.DecryptMessage(entry.username);
              entry.title = UserApi.DecryptMessage(entry.title);
              entry.url = UserApi.DecryptMessage(entry.url);
          }
    
          return entries;
      }
     
    }
    
    
    
    
    
    
    