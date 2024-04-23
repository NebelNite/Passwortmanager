
export class UserApi extends LoginApi {

    static instance;
    
    

    constructor(httpClient, connectionString) {
      super(httpClient, connectionString);
      this.aesKey = null;
    }
    
    
    
    static getInstance() {
      if (UserApi.instance == null) {
        
        UserApi.instance = new UserApi(new HttpClient(), 'http://localhost:8080');
      }
    
      return UserApi.instance;
    }
    
    async createUser(userDto) {
      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
    
      try {
        const response = await this.getHttpClient().post('/users/create', {
          body: JSON.stringify(userDto)
        });
    
        if (response.statusCode == 200) {
          const user = await response.json();
          //MessageBox.show(`Benutzer erfolgreich erstellt! ${String.fromCodePoint(0x1F480)}`);
          return user;
        }
      } catch (error) {
        //MessageBox.show('Username ist bereits vergeben!');
      }
    
      return null;
    }
    
    encodeMasterKey(secret) {
      const sha512 = new Hashes.SHA512();
      const hash = sha512.hex(secret);
      return hash.toLowerCase();
    }
    
    async authenticateUser(userDto) {
      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
    
      const response = await this.getHttpClient().post('/users/authenticate', {
        body: JSON.stringify(userDto)
      });
    
      if (response.statusCode == 200) {
        const user = await response.json();
        this.aesKey = user.aesKey;
        UserApi.user = user;
        return user;
      }
    
      return null;
    }
    
    async getUserByUsernameAndMasterKey(userDto) {
      userDto.masterKey = this.encodeMasterKey(userDto.masterKey);
    
      const response = await this.getHttpClient().post('/users/getUserByUsernameAndMasterKey', {
        body: JSON.stringify(userDto)
      });
    
      if (response.statusCode == 200) {
        return await response.json();
      }
    
      return null;
    }
    
    async getUserById(id) {
      const response = await this.getHttpClient().get(`/users/${id}`);
    
      if (response.statusCode == 200) {
        return await response.json();
      }
      
      return null;
    }
    
    encryptMessage(message, fileKey = null) {
      const aes = new Aes();
    
      if (fileKey !== null) {
        aes.key = fileKey;
      } else {
        aes.key = this.aesKey;
      }
    
      aes.mode = CipherMode.ECB;
    
      const encryptor = aes.createEncryptor();
      const encryptedBytes = encryptor.transformFinalBlock(
        Buffer.from(message, 'utf-8'), 0, message.length
      );
    
      const encryptedString = Buffer.from(encryptedBytes).toString('base64');
    
      return encryptedString;
    }
    
    decryptMessage(encryptedMessage, fileKey = null) {
      const aes = new Aes();
    
      if (fileKey !== null) {
        aes.key = fileKey;
      } else {
        aes.key = this.aesKey;
      }
    
      
      aes.mode = CipherMode.ECB;
      const decryptor = aes.createDecryptor();
    
      //const encryptedBytes = Buffer.from(
        const encryptedBytes = Buffer.from(encryptedMessage, 'base64');
    
        const decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
        decryptedMessage = System.Text.Encoding.UTF8.GetString(decryptedBytes);
    
        return decryptedMessage;
    }
    
    
    
    
}
    
    
    
    
    
    
    