
import { EntryModel } from "../Class/EntryModel.js";
import { UserDTO } from "../Class/UserDTO.js";




export class UserModel {
  constructor() {
    this.id = '';
    this.username = '';
    this.entries = [];
    this.masterKey = '';
  }


  static fromDTO(userDTO) {
    const userModel = new UserModel();
    userModel.id = userDTO.id;
    userModel.username = userDTO.username;
    userModel.entries = userDTO.entries.map((entry) => EntryModel.fromDTO(entry));
    userModel.masterKey = userDTO.masterKey;
    return userModel;
  }

  toDTO() {
    const userDTO = new UserDTO();
    userDTO.id = this.id;
    userDTO.username = this.username;
    userDTO.entries = this.entries.map((entry) => entry.toDTO());
    userDTO.masterKey = this.masterKey;
    return userDTO;
  }
  
}