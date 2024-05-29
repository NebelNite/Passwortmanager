import { LoginApi } from "../Class/LoginApi.js";
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

      userDto.masterKey = await this.encodeMasterKey(userDto.masterKey);

      try {
        const data = await LoginApi.getInstance().postRequest(this.connectionString + "/users/create", userDto, null);
        alert('User erfolgreich erstellt!');
      }
      catch (error) {
        alert('Username ist bereits vergeben!');
      }
      return null;
    }
    
    async encodeMasterKey(secret) {
      
      var hash = CryptoJS.SHA512(secret).toString(CryptoJS.enc.Hex);
      //var hash = CryptoJS.SHA512(secret).toString();
      return hash.toLowerCase();
    }

    
    async authenticateUser(userDto) {

      userDto.masterKey = await this.encodeMasterKey(userDto.masterKey);
      
      const user = await LoginApi.getInstance().postRequest(this.connectionString + "/users/authenticate", userDto);
      return user;

    }

    
    async getUserById(id) {

      let user = await LoginApi.getInstance().getRequest("http://localhost:8080/users/" + id);

      
      return user;
    }
    
}

    
    
    
    
    