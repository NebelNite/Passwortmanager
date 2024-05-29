import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";



export class Encryption{

    static encryptMessage(message, fileKey = null) {

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
    
    
    
    
        return encryptedString;
        
      }
    
      static decryptMessage(encryptedMessage, fileKey = null) {
          
    
          let encKey = null;
          
          if(fileKey!=null)
          {
            encKey = fileKey;
          }
          else{
            encKey = UserApi.aesKey;
          }
          
    
    
        const iv = CryptoJS.enc.Hex.parse("0"); // IV of all zeros
    
        
         let decryptedString = CryptoJS.AES.decrypt(encryptedMessage, encKey, {
          mode: CryptoJS.mode.ECB,
          iv: iv,
          padding: CryptoJS.pad.Pkcs7
        });
    
          
        decryptedString = decryptedString.toString(CryptoJS.enc.Latin1);
          
          
        return decryptedString;
          
      }
        


        static encryptEntry(entry) {
            entry.notes = Encryption.encryptMessage(entry.notes).toString();
            entry.password = Encryption.encryptMessage(entry.password).toString();
            entry.username = Encryption.encryptMessage(entry.username).toString();
            entry.title = Encryption.encryptMessage(entry.title).toString();
            entry.url = Encryption.encryptMessage(entry.url).toString();
        
            return entry;
        }
        
      
        static decryptEntry(entry) {
            entry.notes = Encryption.decryptMessage(entry.notes);
            entry.password = Encryption.decryptMessage(entry.password);
            entry.username = Encryption.decryptMessage(entry.username);
            entry.title = Encryption.decryptMessage(entry.title);
            entry.url = Encryption.decryptMessage(entry.url);
        
            return entry;
        }
        
      
        static encryptEntries(entries) {
            for (const entry of entries) {
                entry.notes = Encryption.encryptMessage(entry.notes);
                entry.password = Encryption.encryptMessage(entry.password);
                entry.username = Encryption.encryptMessage(entry.username);
                entry.title = Encryption.encryptMessage(entry.title);
                entry.url = Encryption.encryptMessage(entry.url);
            }
        
            return entries;
        }
        
        static decryptEntries(entries) {
            for (const entry of entries) {
                entry.notes = Encryption.decryptMessage(entry.notes);
                entry.password = Encryption.decryptMessage(entry.password);
                entry.username = Encryption.decryptMessage(entry.username);
                entry.title = Encryption.decryptMessage(entry.title);
                entry.url = Encryption.decryptMessage(entry.url);
            }
        
            return entries;
        }


  
      static decryptUser(user) {
        
          user.username = Encryption.decryptMessage(user.username);

          user.entries.forEach(entry => {
            entry.notes = Encryption.decryptMessage(entry.notes);
            entry.title = Encryption.decryptMessage(entry.title);
            entry.password = Encryption.decryptMessage(entry.password);
            entry.username = Encryption.decryptMessage(entry.username);
            entry.url = Encryption.decryptMessage(entry.url);
          });

          return user;
      }

}