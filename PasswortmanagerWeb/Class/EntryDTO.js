import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryModel } from "../Class/EntryModel.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";



export class EntryDTO {
    constructor() {
      this.id = '';
      this.title = '';
      this.username = '';
      this.password = '';
      this.url = '';
      this.notes = '';
    }
  }
  
//module.exports = EntryDTO;
