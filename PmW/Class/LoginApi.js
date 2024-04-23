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
      
      
      static async sendRequest(url, method, data) {

        try {
            let requestData = {
                method: method, // Die Methode der Anfrage (GET oder POST)
                headers: {
                    'Content-Type': 'application/json' // Der Content-Type der Daten (JSON)
                }
            };
    
            if (method === 'POST') {
                requestData.body = JSON.stringify({ data }); // Die Daten, die gesendet werden sollen, als JSON formatieren
            }
    
            // Die Anfrage senden
            const response = await fetch(url, requestData);
    
            // Die Antwort verarbeiten
            if (response.ok) {
                // Die Anfrage war erfolgreich (Statuscode 200-299)
                const responseData = await response.json(); // Die Antwortdaten als JSON parsen
                console.log('Antwort des Servers:', responseData);
                return responseData;
            } else {
                // Es gab einen Fehler bei der Anfrage (Statuscode außerhalb von 200-299)
                console.error('Fehler bei der Anfrage:', response.statusText);
                return null;
            }
        } catch (error) {
            // Es gab einen Fehler beim Senden der Anfrage
            console.error('Fehler beim Senden der Anfrage:', error);
            return null;
        }
    }
    
    static async getRequest(url) {
        return await this.sendRequest(url, 'GET', null, null);
    }
    
    static async postRequest(url, data) {
        return await this.sendRequest(url, 'POST', data);
    }

    
}


//module.exports = LoginApi;