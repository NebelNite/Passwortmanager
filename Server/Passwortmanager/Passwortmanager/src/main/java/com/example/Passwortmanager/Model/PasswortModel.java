package com.example.Passwortmanager.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "passwords")
public class PasswortModel {

    @Id
    private String id;
    @Field("password")
    private String password;


    public void setPassword(String password) {
        this.password = password;
    }


    public PasswortModel(String id, String password) {
        this.id = id;
        this.password = password;
    }

    public PasswortModel(String password) {
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }



    public void encryptPassword(String password) throws Exception {
        // Encrypt the password using a secure algorithm
        // Set the encrypted password
    }


}
