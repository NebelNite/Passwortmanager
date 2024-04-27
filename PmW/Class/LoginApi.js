import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { EntryModel } from "../Class/EntryModel.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";




export class LoginApi {
    

    constructor(connectionString) {
      this._connectionString = connectionString;
    }

    getHttpClient() {
        return null;
    }
      
      getConnectionString() {
        return this._connectionString;
      }


    
    static async getRequest(url) {
      
      
      const jsonData = JSON.stringify({ url });

      return fetch('/getToServer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(springBootResponse => {

        let user = springBootResponse.message;
        return user;
        
      //UserApi.user = springBootResponse.message;
      

      })
      .catch(error => {
        console.log("LoginAPI-Client-Error:");
        console.error(error);
      });
      

    
    }
    
    
    static async postRequest(url, data) {

      const jsonData = JSON.stringify({data, url});

      //console.log("Data(LoginApi): " + data.username);
      
      

      fetch('/postToServer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(springBootResponse => {

      //Wenn fetch Erfolgreich war:
      UserApi.user = springBootResponse.message;
      localStorage.setItem(UserApi.user.id, UserApi.user);

      window.location.href = '../homepage?id=' + encodeURIComponent(UserApi.user.id);
      

      })
      .catch(error => {
        console.log("LoginAPI-Client-Error:");
        console.error(error);
      });

        //return await this.sendRequest(url, 'POST', data);
    }

}


//module.exports = LoginApi;