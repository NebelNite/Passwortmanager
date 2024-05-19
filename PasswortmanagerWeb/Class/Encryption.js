import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";



export class Encryption{

    static EncryptMessage(message, fileKey = null) {

        
        let encKey = null;
    
        if(fileKey!=null)
        {
          encKey = fileKey;
        }
        else{

          encKey = UserApi.aesKey;
        }
    
        message = CryptoJS.enc.Utf8.parse(message);
    
    
        
    
    
        const iv = CryptoJS.enc.Hex.parse("0");
        
        
        let encryptedString = CryptoJS.AES.encrypt(message, encKey, {
          mode: CryptoJS.mode.ECB,
          iv: iv,
          padding: CryptoJS.pad.Pkcs7
        });
    
    
        //encryptedString = encryptedString.toString(CryptoJS.enc.Utf8);
    
    
        return encryptedString;
        
      }
    
      static DecryptMessage(encryptedMessage, fileKey = null) {
          
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
        


        static EncryptEntry(entry) {
            entry.notes = Encryption.EncryptMessage(entry.notes).toString();
            entry.password = Encryption.EncryptMessage(entry.password).toString();
            entry.username = Encryption.EncryptMessage(entry.username).toString();
            entry.title = Encryption.EncryptMessage(entry.title).toString();
            entry.url = Encryption.EncryptMessage(entry.url).toString();
        
            return entry;
        }
        
      
        static DecryptEntry(entry) {
            entry.notes = Encryption.DecryptMessage(entry.notes);
            entry.password = Encryption.DecryptMessage(entry.password);
            entry.username = Encryption.DecryptMessage(entry.username);
            entry.title = Encryption.DecryptMessage(entry.title);
            entry.url = Encryption.DecryptMessage(entry.url);
        
            return entry;
        }
        
      
        static EncryptEntries(entries) {
            for (const entry of entries) {
                entry.notes = Encryption.EncryptMessage(entry.notes);
                entry.password = Encryption.EncryptMessage(entry.password);
                entry.username = Encryption.EncryptMessage(entry.username);
                entry.title = Encryption.EncryptMessage(entry.title);
                entry.url = Encryption.EncryptMessage(entry.url);
            }
        
            return entries;
        }
        
        static DecryptEntries(entries) {
            for (const entry of entries) {
                entry.notes = Encryption.DecryptMessage(entry.notes);
                entry.password = Encryption.DecryptMessage(entry.password);
                entry.username = Encryption.DecryptMessage(entry.username);
                entry.title = Encryption.DecryptMessage(entry.title);
                entry.url = Encryption.DecryptMessage(entry.url);
            }
        
            return entries;
        }

}