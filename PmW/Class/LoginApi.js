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

    // CORS:
    /*
    fetch("http://localhost:8080/users/create", {
  method: "POST",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    // ...
  })
})
.then(response => {
  // ...
})
.catch(error => {
  // ...
});
    */


/*
      static async sendRequest(url, method, data) {

        const jsonData = JSON.stringify({data, url});

        console.log("Data(LoginApi): " + data.username);

        fetch('/sendToServer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        })
        .then(response => response.json())
        .then(data => {
          console.log("LoginApi: ResponseFromNodeJS:" + data.message);
          // Do something with the response data
        })
        .catch(error => {
          console.error(error);
        });
        
    }
    */

    
    static async getRequest(url, dataInUrl) {
      
      const queryParams = new URLSearchParams(dataInUrl).toString();
      const jsonData = JSON.stringify({ data, url });
      

      const response = await fetch(`/getToServer?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      const responseData = await response.json();
      
      //console.log("LoginApi: ResponseFromNodeJS:" + responseData.message);
      // Do something with the response data
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
      //.then(response => response.json())
      .then(data => {
        console.log("LoginAPI:RetrievedData");
        console.log(data);
        //console.log("LoginApi: ResponseFromNodeJS:" + data.message);
        // Do something with the response data
      })
      .catch(error => {
        console.log("LoginAPI-Client-Error:");
        console.error(error);
      });

        //return await this.sendRequest(url, 'POST', data);
    }

}


//module.exports = LoginApi;