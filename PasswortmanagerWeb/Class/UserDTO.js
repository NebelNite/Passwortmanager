const EntryDTO = require('./EntryDTO');

export class UserDTO {
  constructor() {
    this.id = '';
    this.username = '';
    this.entries = [];
    this.masterKey = '';
  }

  static fromModel(userModel) {
    const userDTO = new UserDTO();
    userDTO.id = userModel.id;
    userDTO.username = userModel.username;
    userDTO.entries = userModel.entries.map((entry) => new EntryDTO().fromModel(entry));
    userDTO.masterKey = userModel.masterKey;
    return userDTO;
  }
}

module.exports = UserDTO;
