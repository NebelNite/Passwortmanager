import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { EntryModel } from "../Class/EntryModel.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";




export class LoginApi {
    
  static connectionString;
  
    constructor(connectionString) {
      this.connectionString = connectionString;
    }

    getHttpClient() {
        return null;
    }
      
      getConnectionString() {
        return this.connectionString;
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


      try {
        const response = await fetch('/postToServer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        });
    
        const springBootResponse = await response.json();
  
    
        let user = springBootResponse.message;
        return user;
      } catch (error) {
        console.log("LoginAPI-Client-Error:");
        console.error(error);
      }

      /*
      fetch('/postToServer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => await response.json())
      .then(springBootResponse => {

      let user = springBootResponse.message;
      return user;
      */
      
      /*
      localStorage.setItem(UserApi.user.id, UserApi.user);
      let id = UserApi.user.id;

      let username = UserApi.user.username;


      window.location.href = '../homepage?id=' + encodeURIComponent(id) + "&usn=" + encodeURIComponent(username);
      */

      /*
      })
      .catch(error => {
        console.log("LoginAPI-Client-Error:");
        console.error(error);
      });*/

    }

}


//module.exports = LoginApi;