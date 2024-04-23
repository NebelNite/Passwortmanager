import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";



export class EntryModel {

  constructor() {
    this.id = '';
    this.title = '';
    this.username = '';
    this.password = '';
    this.url = '';
    this.notes = '';
  }

  static fromDTO(entryDTO) {
    const entryModel = new EntryModel();
    entryModel.id = entryDTO.id;
    entryModel.title = entryDTO.title;
    entryModel.username = entryDTO.username;
    entryModel.password = entryDTO.password;
    entryModel.url = entryDTO.url;
    entryModel.notes = entryDTO.notes;
    return entryModel;
  }

  toDTO() {
    const entryDTO = new EntryDTO();
    entryDTO.id = this.id;
    entryDTO.title = this.title;
    entryDTO.username = this.username;
    entryDTO.password = this.password;
    entryDTO.url = this.url;
    entryDTO.notes = this.notes;
    return entryDTO;
  }

  toString() {
    const password = '*'.repeat(this.password.length);
    return `Title: ${this.title}, Username: ${this.username}, Password: ${password}, URL: ${this.url}, Notes: ${this.notes}`;
  }
}

//module.exports = EntryModel;