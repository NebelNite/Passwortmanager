

class LoginApi {
    constructor(httpClient, connectionString) {
      this._httpClient = httpClient;
      this._connectionString = connectionString;
    }
    
      getHttpClient() {
        return this._httpClient;
      }
    
      getConnectionString() {
        return this._connectionString;
      }
    
      
      
    
    
      
      static async sendRequest(url, method, data1, data2) {
        try {
            let requestData = {
                method: method, // Die Methode der Anfrage (GET oder POST)
                headers: {
                    'Content-Type': 'application/json' // Der Content-Type der Daten (JSON)
                }
            };
    
            if (method === 'POST') {
                requestData.body = JSON.stringify({ data1, data2 }); // Die Daten, die gesendet werden sollen, als JSON formatieren
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
    
    static async postRequest(url, data1, data2) {
        return await this.sendRequest(url, 'POST', data1, data2);
    }
    
    
    
    
    
}
