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


    
    
    static getInstance() {
      
      if (UserApi.instance == null) {
        
        UserApi.instance = new UserApi('http://localhost:8080');
      }

      return UserApi.instance;
    }
    
    async createUser(userDto) {

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

    
    static async getUserById(id) {

      let user = await LoginApi.getRequest("http://localhost:8080/users/" + id);

      
      return user;
    }
    
}

    
    
    
    
    