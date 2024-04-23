import CryptoJS from '/crypto-js';

/*
import { UserApi } from "../Class/UserApi";
import { EntryApi } from "../Class/EntryApi";
import { EntryDTO } from "../Class/EntryDTO";
import { EntryModel } from "../Class/EntryModel";
import { LoginApi } from "../Class/LoginApi";
import { UserDTO } from "../Class/UserDTO";
import { UserModel } from "../Class/UserModel";
*/


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
  
constructor(connectionString) {
  this._connectionString = connectionString;
}

/*
  getHttpClient() {
    return this._httpClient;
  }
  */

  //pathVar

  
  postRequest(obj,url)
  {
    axios.post(url, obj)
    .then(response => {

      console.log('Erfolgreich gepostet. Antwort:', response.data);

    })
    .catch(error => {
      console.error('Fehler beim Posten:', error);
    });
    

  }

  getRequest(url)
  {
    axios.get(url)
    .then(response => {
      console.log('Erfolgreich erhalten. Antwort:', response.data);
    })
    .catch(error => {
      console.error('Fehler beim Abrufen:', error);
    });
  }
  

  
  getConnectionString() {
    return this._connectionString;
  }



  
  /*


  
  static async sendRequest(url, method, data1, data2) {

    try {
        let requestData = {
            method: method, // Die Methode der Anfrage (GET oder POST)
            headers: {
                'Content-Type': 'application/json' // Der Content-Type der Daten (JSON)
            }
        };
        
        if (method === 'POST') {
            requestData.body = JSON.stringify({ data1, data2 }); // Die Daten, die gesendet werden sollen, als JSON formatieren
        }
        
        const response = await fetch(url, requestData);

        if (response.ok) {
            const responseData = await response.json(); // Die Antwortdaten als JSON parsen
            console.log('Antwort des Servers:', responseData);
            return responseData;
        } else {
            console.error('Fehler bei der Anfrage:', response.statusText);
            return null;
        }
    } catch (error) {
        // Es gab einen Fehler beim Senden der Anfrage
        console.error('Fehler beim Senden der Anfrage:', error);
        return null;
    }
}

static async getRequest(url) {
    return await this.sendRequest(url, 'GET', null, null);
}

static async postRequest(url, data1, data2) {
    return await this.sendRequest(url, 'POST', data1, data2);
}

*/



}







class UserApi extends LoginApi {
  
static instance;

constructor(connectionString) {
  super(connectionString);
  this.aesKey = null;
}



static getInstance() {
  if (UserApi.instance == null) {
    
    UserApi.instance = new UserApi('http://localhost:8080');
  }

  return UserApi.instance;
}

async createUser(userDto) {
  
  console.log("Test");
  userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
  
  //JSON
  this.postRequest(this.getConnectionString()+"/users/create", userDto);

  
  /*
  try {
    const response = await this.getHttpClient().post('/users/create', {
      body: JSON.stringify(userDto)
    });

    if (response.statusCode == 200) {
      const user = await response.json();
      //MessageBox.show(`Benutzer erfolgreich erstellt! ${String.fromCodePoint(0x1F480)}`);
      return user;
    }
  } catch (error) {
    //MessageBox.show('Username ist bereits vergeben!');
  }
*/
  return null;

}

encodeMasterKey(secret) {
  const sha512 = new Hashes.SHA512();
  const hash = sha512.hex(secret);
  return hash.toLowerCase();
}

async authenticateUser(userDto) {
  userDto.masterKey = this.encodeMasterKey(userDto.masterKey);

  /*
  const response = await this.getHttpClient().post('/users/authenticate', {
    body: JSON.stringify(userDto)
  });

  if (response.statusCode == 200) {
    const user = await response.json();
    this.aesKey = user.aesKey;
    UserApi.user = user;
    return user;
  }
*/
  return null;
}

async getUserByUsernameAndMasterKey(userDto) {
  userDto.masterKey = this.encodeMasterKey(userDto.masterKey);

  /*
  const response = await this.getHttpClient().post('/users/getUserByUsernameAndMasterKey', {
    body: JSON.stringify(userDto)
  });

  if (response.statusCode == 200) {
    return await response.json();
  }
*/
  return null;
}

async getUserById(id) {
  /*
  const response = await this.getHttpClient().get(`/users/${id}`);

  if (response.statusCode == 200) {
    return await response.json();
  }
  */
  
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










//const { MessageBox } = require('electron'); // Annahme: Verwendung von Electron für MessageBox


class EntryApi extends LoginApi {

  constructor(connectionString) {
      super(connectionString);
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

          /*
          const response = await this.GetHttpClient().PostAsJsonAsync(this.GetConnectionString() + "/entries/delete/" + selectedEntry.id, userDTO);
          
          response.EnsureSuccessStatusCode();
*/
          const entryCount = user.entries.length;
          for (let i = 0; entryCount == user.entries.length; i++) {
              if (user.entries[i].id == selectedEntry.id) {
                  user.entries.splice(i, 1);
              }
          }

          UserApi.user = user;
          this.EntryCreated?.(this, user);
      } catch (ex) {
          //MessageBox.show("Deleting Entry failed!");
      }
  }



  async editEntry(entryDto) {
    try {
        const user = UserApi.user;
        const userDTO = new UserDTO();
        userDTO.id = user.id;

        const userApi = UserApi.GetInstance();

        entryDto = this.EncryptEntry(entryDto);
        /*
        const response = await this.GetHttpClient().PostAsJsonAsync(this.GetConnectionString() + "/entries/editEntry/" + userDTO.id, entryDto);
        response.EnsureSuccessStatusCode();
        */
       
        this.EntryCreated?.(this, user);
    } catch (ex) {
        //MessageBox.show("Creating/Editing Entry failed!");
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
        /*
        const response = await this.GetHttpClient().PostAsJsonAsync(this.GetConnectionString() + "/users/" + user.id + "/addEntry", entryDto);
        response.EnsureSuccessStatusCode();
        
        UserApi.user = await UserApi.GetInstance().GetUserById(UserApi.user.id);
        */
       
        this.EntryCreated?.(this, user);
    } catch (ex) {
        //MessageBox.show("Creating/Editing Entry failed!");
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


























































document.addEventListener('DOMContentLoaded', function() {


/*
const axios = require('axios');
const nodeWindows = require('node-windows');
*/




/*
const { UserCredential } = require('node-windows').Credentials;
*/

/*
require(['node-windows'], function(nodeWindows) {


});



require(['axios'], function(axios) {
  
});
*/



//const axios = require('axios');


  console.log("Here");

  let userApi = UserApi.getInstance();

  function isValidPassword(masterkey) {
    let output = "";
    const nonSpecialCharacters = /[^A-Za-z0-9]/;
    
    /*
    if (masterkey.length < 10) {
      output += "At least: 10 characters\n";
    }

    if (!nonSpecialCharacters.test(masterkey)) {
      output += "At least: 1 special character\n";
    }
    */

    return output;
  }


  

  function signUpButtonClick(event) {
    
    console.log("SignUp1");
    
    const username = document.getElementById("usernameInput").value;
    const masterkey = document.getElementById("masterKeyInput").value;

    const msg = isValidPassword(masterkey);
    

    if (msg.length == 0) {
      if (!aesKeyExistsForUser(username)) {
        setAesKeyForUser(username);
      }
      
    console.log("SignUp2");


      const userDTO = new UserDTO();
      userDTO.masterKey = userApi.encryptMessage(masterkey);
      userDTO.username = userApi.encryptMessage(username);

      userApi.createUserAsync(userDTO)
        .then(() => {
          console.log("SignUp successful!");
        })
        .catch((error) => {
          console.error("SignUp failed:", error);
          alert("SignUp failed!");
        });
    } else {
      alert(msg);
    }
    
    console.log("SignUp3");
  }
  
  function setAesKeyForUser(username) {
    
    const aesKey = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
    console.log(aesKey);

    localStorage.setItem(username, aesKey.toString(CryptoJS.enc.Base64));
    
    /*
    const aes = new Aes();
    aes.generateKey();
    const aesKey = Array.from(aes.key);
    const aesKeyBase64 = btoa(String.fromCharCode.apply(null, aesKey));
    
    const credentialSet = new Credential({
      target: "AESKey",
      username: username,
      password: aesKeyBase64,
      persistanceType: PersistanceType.LocalComputer
    });

    credentialSet.save();
    */

  }


function getAesKeyForUser(username) {

  let aesKeyObj = null;
  const retrievedAesKey = localStorage.getItem(username);
  aesKeyObj = CryptoJS.enc.Base64.parse(retrievedAesKey);
  
  return aesKeyObj;

    /*
    const credential = new Credential({
      target: "AESKey",
      username: username
    });

    if (credential.load()) {
      const aesKeyBase64 = credential.password;
      const aesKey = Uint8Array.from(atob(aesKeyBase64), c => c.charCodeAt(0));

      return aesKey;
    } else {
      console.log("The AES key was not found.");
    }

    return null;
    */
  }


  
  function aesKeyExistsForUser(username) {

    console.log(username);


    const retrievedAesKey = localStorage.getItem(username);
    
    if (retrievedAesKey == null) {
      return false;
    } else {
      return true;
    }


    /*
    let credential= new Credential({
      target: "AESKey",
      username: username
    })
    
    
    console.log(credential.target);


    let credential = new UserCredential({
      target: "AESKey",
      username: username
    });


    credential.get((error, result) => {
      if (error) {
        console.error(`Error retrieving credential: ${error}`);
      } else {
        // The AES key is stored in the password property of the result object
        const aesKey = Buffer.from(result.password, 'base64');
        console.log('AES key:', aesKey.toString('hex'));
      }
    });
    */

   
  }

  function signInButtonClick(event) {

    const userDTO = new UserDTO();
    userDTO.masterKey = document.getElementById("SignInMasterkey").value;
    userDTO.username = document.getElementById("SignInUsername").value;
    
    userApi.aesKey = getAesKeyForUser(userDTO.username);

    userDTO.masterKey = userApi.encryptMessage(userDTO.masterKey);
    userDTO.username = userApi.encryptMessage(userDTO.username);

    userApi.authenticateUserAsync(userDTO)
      .then((user) => {

          const userJson = encodeURIComponent(JSON.stringify(user));
          const url = `../HTML/homepage.html?user=${userJson}`;
          window.location.href = url;
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        alert("Authentication failed. Please check your credentials and try again.");
      });
  }


  // Initialize the UserApi instance
  //UserApi.initialize();
  //UserApi.getInstance();

  // Add event listeners to the Sign Up and Sign In buttons
  document.getElementById("SignUpButton").addEventListener("click", signUpButtonClick);
  document.getElementById("SignInButton").addEventListener("click", signInButtonClick);
  


});



































































