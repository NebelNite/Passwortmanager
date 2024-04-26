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
    static aesKey;

    // byteArr  32bit
    //static aesKey = new Uint8Array(32);

    //CryptoJS.lib.WordArray.random(32);

    constructor(connectionString, key = this.aesKey) {
      super(connectionString);
      this.aesKey = key;
    };
    
    /*
    setAesKey(key)
    {
      this.aesKey = key;
    }*/

    
    static getInstance(key = null) {

      if (UserApi.instance == null) {

        UserApi.instance = new UserApi('http://localhost:8080', key);
      }

      return UserApi.instance;
    }
    
    async createUser(userDto) {

      // duplicate Entries for Users
      userDto.id = null;

      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
      
      const data = await LoginApi.postRequest(this._connectionString + "/users/create", userDto, null);
      
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

    
    authenticateUser(userDto) {

      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);

      const data = LoginApi.postRequest(this._connectionString + "/users/authenticate", userDto, null);

      console.log("TestAuth: " + data.message);
      
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
      return null;
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
    
    getUserById(id) {

      const response = this.getHttpClient().get(`/users/${id}`);
    
      if (response.statusCode == 200) {
        return response.json();
      }
      
      return null;
    }
    
    encryptMessage(message, fileKey = null) {
      
      

      //const aes = new Aes();

      /*
      if (fileKey !== null) {
        aes.key = fileKey;
      } else {
        aes.key = this.aesKey;
      }
      */
     
     
        
    let encKey = null;
    console.log(this.aesKey);
    
    if(fileKey!=null)
    {
      encKey = fileKey;
    }
    else{
      //encKey = CryptoJS.lib.WordArray.create(this.aesKey.words.slice());
      encKey = this.aesKey;
    }

    encKey = CryptoJS.enc.Utf8.parse(encKey);
    const iv = CryptoJS.enc.Hex.parse("0000000000000000"); // IV of all zeros
    
    const encryptedString = CryptoJS.AES.encrypt(message, encKey, {
      mode: CryptoJS.mode.ECB,
      iv: iv,
      padding: CryptoJS.pad.NoPadding
    }).toString();

    
    
    /*
    const encryptedString = CryptoJS.AES.encrypt(message, encKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding
    }).toString();
*/

    //const encryptedString = CryptoJS.AES.encrypt(message, encKey).toString(CryptoJS.enc.Base64);

    /*
    const encryptObject = CryptoJS.AES.encrypt(message, encKey);
    const encryptedString = encryptObject.toString();
*/

    //const encodedData = Base64.stringify(encryptedString);
    /*
    const aes = CryptoJS.algo.AES.create({ key: encKey });
    aes.mode = CryptoJS.mode.ECB;


    // Encrypt the message

    const encryptor = aes.encryptor();
    const encryptedBytes = encryptor.finalize(CryptoJS.enc.Utf8.parse(message));

    const encryptedString = CryptoJS.enc.Base64.stringify(encryptedBytes);
    */
    return encryptedString;





/*
    const encryptedBytes = CryptoJS.enc.Utf8.parse(message);
    const encryptedWordArray = aes.finalize(encryptedBytes);
    const encryptedBase64 = encryptedWordArray.toString(CryptoJS.enc.Base64);
    
    return encryptedBase64;
*/
      /*
      aes.mode = CipherMode.ECB;
    
      const encryptor = aes.createEncryptor();
      const encryptedBytes = encryptor.transformFinalBlock(
        Buffer.from(message, 'utf-8'), 0, message.length
      );
      
      const encryptedString = Buffer.from(encryptedBytes).toString('base64');
    
      return encryptedString;
      */
    }
    
    decryptMessage(encryptedMessage, fileKey = null) {
      
      let encKey = null;
      console.log(this.aesKey);
      
      if(fileKey!=null)
      {
        encKey = fileKey;
      }
      else{
        //encKey = CryptoJS.lib.WordArray.create(this.aesKey.words.slice());
        encKey = this.aesKey;
      }

      
    encKey = CryptoJS.enc.Utf8.parse(encKey); 
    const iv = CryptoJS.enc.Utf8.parse('0000000000000000'); // Set the IV to a known value

     const decryptedString = CryptoJS.AES.decrypt(encryptedMessage, encKey, {
      mode: CryptoJS.mode.ECB,
      iv: iv,
      padding: CryptoJS.pad.NoPadding
    }).toString();

     decryptedString = decryptedString.toString(CryptoJS.enc.Utf8);
     
     
      //const encryptedString = CryptoJS.AES.encrypt(message, encKey).toString(CryptoJS.enc.Base64);
  
      /*
      const decryptedObject = CryptoJS.AES.encrypt(encryptedMessage, encKey);
      const decryptedString = decryptedObject.toString();
    */
  

      return decryptedString;
    }
    
}

//module.exports = UserApi;
    
    
    
    
    
    