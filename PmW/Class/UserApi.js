//import { enc } from "crypto-js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { EntryModel } from "../Class/EntryModel.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";




export class UserApi extends LoginApi {

    static instance;
    static user = new UserModel();

    static aesKey = null;

    // byteArr  32bit
    //static aesKey = new Uint8Array(32);

    //CryptoJS.lib.WordArray.random(32);
    
    constructor(connectionString) {
      super(connectionString);
      //this.aesKey = key;
    };

    /*
    setAesKey(key)
    {
      this.aesKey = key;
    }*/
    
    
    static GetInstance() {
      
      if (UserApi.instance == null) {
        
        UserApi.instance = new UserApi('http://localhost:8080');
      }

      return UserApi.instance;
    }
    
    async createUser(userDto) {

      // duplicate Entries for Users
      userDto.id = null;

      let str = this.connectionString;

      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
      
      const data = await LoginApi.postRequest(this.connectionString + "/users/create", userDto, null);
      
      /*
      try {
        const response = this.getHttpClient().post('/users/create', {
          body: JSON.stringify(userDto)
        });
    
        if (response.statusCode == 200) {
          const user = response.json();
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
      
      var hash = CryptoJS.SHA512(secret).toString();
      return hash.toLowerCase();
    }

    
    async authenticateUser(userDto) {
      
      
      //window.location.href = '../homepage';
      
      //window.location.href = '../HTML/homepage.html';
      /*
      fetch('/homepage')
      .then(response => {
          if (response.ok) {
            window.location.href = '/HTML/homepage.html';
          } else {
            console.error('Error:', response.status);
          }
          })
        .catch(error => console.error(error));
        */
       
      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);

      const user = await LoginApi.postRequest(this.connectionString + "/users/authenticate", userDto);
      
      return user;

      
      /*
      if(data != null)
      {
        
        fetch('/homepage')
      .then(response => {
          if (response.ok) {
            //window.location.href = '/homepage.html';
          } else {
            console.error('Error:', response.status);
          }
          })
        .catch(error => console.error(error));
      }
      */
      
      /*
      const response = this.getHttpClient().post('/users/authenticate', {
        body: JSON.stringify(userDto)
      });
    
      if (response.statusCode == 200) {
        const user = response.json();
        this.aesKey = user.aesKey;
        UserApi.user = user;
        return user;
      }
    */
    }
    
    
    getUserByUsernameAndMasterKey(userDto) {
      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
    
      const response = this.getHttpClient().post('/users/getUserByUsernameAndMasterKey', {
        body: JSON.stringify(userDto)
      });
    
      if (response.statusCode == 200) {
        return response.json();
      }
    
      return null;
    }
    
    static async getUserById(id) {

      let user = await LoginApi.getRequest("http://localhost:8080/users/" + id);
      //user = user.then(user);
      
      return user;
    }

    EncryptMessage(message, fileKey = null) {

    let encKey = null;

    if(fileKey!=null)
    {
      encKey = fileKey;
    }
    else{
      encKey = UserApi.aesKey;
    }

    encKey = CryptoJS.enc.Utf8.parse(encKey);

    message = CryptoJS.enc.Utf8.parse(message);

    


    const iv = CryptoJS.enc.Hex.parse("0000000000000000"); // IV of all zero
    
    
    let encryptedString = CryptoJS.AES.encrypt(message, encKey, {
      mode: CryptoJS.mode.ECB,
      iv: iv,
      padding: CryptoJS.pad.NoPadding
    }).toString();
  


    return encryptedString;
    
  }
    
    DecryptMessage(encryptedMessage, fileKey = null) {
      

      let encKey = null;
      
      if(fileKey!=null)
      {
        encKey = fileKey;
      }
      else{
        encKey = UserApi.aesKey;
      }
      

    encKey = CryptoJS.enc.Utf8.parse(encKey);

    const iv = CryptoJS.enc.Hex.parse("0000000000000000"); // IV of all zeros


     let decryptedString = CryptoJS.AES.decrypt(encryptedMessage, encKey, {
      mode: CryptoJS.mode.ECB,
      iv: iv,
      padding: CryptoJS.pad.NoPadding
    }).toString();

      decryptedString = CryptoJS.enc.Utf8.parse(decryptedString);

      return decryptedString;
      
    }

}

//module.exports = UserApi;
    
    
    
    
    
    