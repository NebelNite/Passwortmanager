package com.example.Passwortmanager.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "entries")
public class EntryModel {


    @Id
    private String id;
    private String title;
    private String username;
    private String password;
    private String url;
    private String notes;
    
    public EntryModel(String id, String title, String username, String password, String url, String notes) {
        this.id = id;
        this.title = title;
        this.username = username;
        this.password = password;
        this.url = url;
        this.notes = notes;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getUrl() {
        return url;
    }

    public String getNotes() {
        return notes;
    }



}
