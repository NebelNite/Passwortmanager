package com.example.Passwortmanager.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "entries")
public class EntryModel {


    @Id
    private String id;
    @Field("title")
    private String title;
    @Field("username")
    private String username;
    @Field("password")
    private String password;
    @Field("url")
    private String url;
    @Field("notes")
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

    public void setId(String id) {
        this.id = id;
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
