
export class LoginApi {
    
  static connectionString;
  
    constructor(connectionString) {
      this.connectionString = connectionString;
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
    })
    .catch(error => {
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

    }

}
