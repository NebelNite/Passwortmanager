import { UserApi } from "../Class/UserApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { EntryModel } from "../Class/EntryModel.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";



export class EntryApi extends LoginApi {

    
    static instance = null;
    
    constructor(httpClient, connectionString) {
        super(httpClient, connectionString);
        this.EntryCreated = null;
    }
  
    // Methode zum Abrufen einer Singleton-Instanz der EntryApi-Klasse
    static GetInstance() {
        if (!this.instance) {
            EntryApi.instance = new EntryApi("http://localhost:8080");
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
  
            
            await LoginApi.postRequest(this.connectionString + "/entries/delete/" + selectedEntry.id, userDTO);
            
            UserApi.user = await UserApi.getUserById(UserApi.user.id);


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
          
          //entryDto = this.EncryptEntry(entryDto);
  
          
          await LoginApi.postRequest(this.connectionString + "/entries/editEntry/" + userDTO.id, entryDto);
          
          UserApi.user = await UserApi.getUserById(UserApi.user.id);

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

          //entryDto = this.EncryptEntry(entryDto);
          
          const userApi = UserApi.GetInstance();

          await LoginApi.postRequest(this.connectionString + "/entries/addEntry/"+ user.id, entryDto);

          UserApi.user = await UserApi.getUserById(UserApi.user.id);

          //return response;
          
          //this.EntryCreated?.(this, user);
      } catch (ex) {
          //MessageBox.show("Creating/Editing Entry failed!");
      }
  }
  
/*
  EncryptEntry(entry) {
      entry.notes = UserApi.GetInstance().EncryptMessage(entry.notes).toString();
      entry.password = UserApi.GetInstance().EncryptMessage(entry.password).toString();
      entry.username = UserApi.GetInstance().EncryptMessage(entry.username).toString();
      entry.title = UserApi.GetInstance().EncryptMessage(entry.title).toString();
      entry.url = UserApi.GetInstance().EncryptMessage(entry.url).toString();
  
      return entry;
  }
  

  static DecryptEntry(entry) {
      entry.notes = UserApi.GetInstance().DecryptMessage(entry.notes);
      entry.password = UserApi.GetInstance().DecryptMessage(entry.password);
      entry.username = UserApi.GetInstance().DecryptMessage(entry.username);
      entry.title = UserApi.GetInstance().DecryptMessage(entry.title);
      entry.url = UserApi.GetInstance().DecryptMessage(entry.url);
  
      return entry;
  }
  

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
  */
  

}

//module.exports = EntryApi;
    