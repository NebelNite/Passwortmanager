package com.example.Passwortmanager.DTOs;

import com.example.Passwortmanager.Model.EntryModel;
import lombok.Data;

@Data
public class EntryDTO {

    private String id;

    private String title;
    private String username;
    private String password;
    private String url;
    private String notes;


    public EntryDTO()
    {

    }
    public EntryDTO(EntryModel entryModel) {
        this.id = entryModel.getId();
        this.title = entryModel.getTitle();
        this.username = entryModel.getUsername();
        this.password = entryModel.getPassword();
        this.url = entryModel.getUrl();
        this.notes = entryModel.getNotes();
    }

    public EntryModel toEntryModel() {
        return new EntryModel(this.id, this.title, this.username, this.password, this.url, this.notes);
    }


}
