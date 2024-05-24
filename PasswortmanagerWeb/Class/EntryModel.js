import { EntryDTO } from "../Class/EntryDTO.js";

export class EntryModel {

  constructor() {
    this.id = '';
    this.title = '';
    this.username = '';
    this.password = '';
    this.url = '';
    this.notes = '';
  }
  

  toString() {
    const password = '*'.repeat(this.password.length);
    return `Title: ${this.title}, Username: ${this.username}, Password: ${password}, URL: ${this.url}, Notes: ${this.notes}`;
  }
}
