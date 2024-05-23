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

    
    constructor(connectionString) {
      super(connectionString);

    };


    
    
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

      try {
        const data = await LoginApi.postRequest(this.connectionString + "/users/create", userDto, null);
        alert('User erfolgreich erstellt!');
      }
      catch (error) {
        alert('Username ist bereits vergeben!');
      }
      return null;
    }
    
    encodeMasterKey(secret) {
      
      var hash = CryptoJS.SHA512(secret).toString();
      return hash.toLowerCase();
    }

    
    async authenticateUser(userDto) {
      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
      const user = await LoginApi.postRequest(this.connectionString + "/users/authenticate", userDto);
      return user;

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

    /*
    EncryptMessage(message, fileKey = null) {
      

    let encKey = null;

    if(fileKey!=null)
    {
      encKey = fileKey;
    }
    else{
      encKey = UserApi.aesKey;
    }

    message = CryptoJS.enc.Utf8.parse(message);



    //encKey = CryptoJS.enc.Utf8.parse(encKey);
    //message = CryptoJS.enc.Utf8.parse(message);

    


    const iv = CryptoJS.enc.Hex.parse("0"); // IV of all zero
    
    
    let encryptedString = CryptoJS.AES.encrypt(message, encKey, {
      mode: CryptoJS.mode.ECB,
      iv: iv,
      padding: CryptoJS.pad.Pkcs7
    });


    //encryptedString = encryptedString.toString(CryptoJS.enc.Utf8);


    return encryptedString;
    
  }
  */
/*
    DecryptMessage(encryptedMessage, fileKey = null) {
      
      //encryptedMessage = CryptoJS.enc.Latin1.parse(encryptedMessage);

      let encKey = null;
      
      if(fileKey!=null)
      {
        encKey = fileKey;
      }
      else{
        encKey = UserApi.aesKey;
      }
      

    //encKey = CryptoJS.enc.Utf8.parse(encKey);

    const iv = CryptoJS.enc.Hex.parse("0"); // IV of all zeros

    
     let decryptedString = CryptoJS.AES.decrypt(encryptedMessage, encKey, {
      mode: CryptoJS.mode.ECB,
      iv: iv,
      padding: CryptoJS.pad.Pkcs7
    });

      //decryptedString = CryptoJS.enc.Utf8.parse(decryptedString);
      
      decryptedString = decryptedString.toString(CryptoJS.enc.Latin1);
      
      //decryptedString = decryptedString.toString();
      //decryptedString = decryptedString.toString(CryptoJS.enc.Utf16);
      
      //decryptedString = CryptoJS.enc.Utf8.parse(decryptedString);
      
      return decryptedString;
      
    }
*/
}

//module.exports = UserApi;
    
    
    
    
    
    