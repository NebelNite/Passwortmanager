import { UserApi } from "../Class/UserApi.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { Encryption } from "../Class/Encryption.js";


export class EntryApi extends LoginApi {

    
    static instance = null;
    
    constructor(httpClient, connectionString) {
        super(httpClient, connectionString);
        this.EntryCreated = null;
    }
  
    static getInstance() {
        if (!this.instance) {
            EntryApi.instance = new EntryApi("http://localhost:8080");
        }
        return this.instance;
    }
    
  
    async deleteEntry(selectedEntry) {
        try {

            const user = UserApi.user;
            const userDTO = new UserDTO();
            userDTO.username = user.username;
            userDTO.id = user.id;
            userDTO.masterKey = user.masterKey;
            userDTO.entries = user.entries;
  
            
            await LoginApi.getInstance().postRequest(this.connectionString + "/entries/delete/" + selectedEntry.id, userDTO);
            
            UserApi.user = await UserApi.getInstance().getUserById(UserApi.user.id);
            

        } catch (ex) {
            console.log(ex)
        }
    }
    
    async editEntry(entryDto) {
      try {
          const user = UserApi.user;
          const userDTO = new UserDTO();
          userDTO.id = user.id;
  
          const userApi = UserApi.getInstance();

          entryDto = Encryption.encryptEntry(entryDto);
  
          
          await LoginApi.getInstance().postRequest(this.connectionString + "/entries/editEntry/" + userDTO.id, entryDto);
          
          UserApi.user = await UserApi.getInstance().getUserById(UserApi.user.id);

      } catch (ex) {
          console.log(ex)
      }
  }
  

  async createEntry(entryDto) {
    
      try {
          const user = UserApi.user;
          const userDTO = new UserDTO();
          userDTO.username = user.username;
          userDTO.id = user.id;
          userDTO.masterKey = user.masterKey;
          userDTO.entries = user.entries;

        

          await LoginApi.getInstance().postRequest(this.connectionString + "/entries/addEntry/"+ user.id, entryDto);

          UserApi.user = await UserApi.getInstance().getUserById(UserApi.user.id);

          
      } catch (ex) {
          console.log(ex)
      }
  }
  
}