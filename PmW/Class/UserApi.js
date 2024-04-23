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
    aesKey;

    // byteArr  32bit
    //static aesKey = new Uint8Array(32);

    //CryptoJS.lib.WordArray.random(32);
    
    constructor(connectionString, key = this.aesKey) {
      super(connectionString);
      this.aesKey = key;
    };
    
    /*
    static setAesKey(key)
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
      const sha512 = new Hashes.SHA512();
      const hash = sha512.hex(secret);
      return hash.toLowerCase();
    }

    
    authenticateUser(userDto) {
      
      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);

      const response = this.getHttpClient().post('/users/authenticate', {
        body: JSON.stringify(userDto)
      });
    
      if (response.statusCode == 200) {
        const user = response.json();
        this.aesKey = user.aesKey;
        UserApi.user = user;
        return user;
      }
    
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

    const encryptedString = CryptoJS.AES.encrypt(message, encKey);
  
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

//module.exports = UserApi;
    
    
    
    
    
    