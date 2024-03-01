package com.example.Passwortmanager.DTOs;
import com.example.Passwortmanager.Model.PasswortModel;
import lombok.Data;


@Data
public class PasswortDTO {

    private String id;
    private String password;


    public PasswortDTO()
    {}

    public PasswortDTO(PasswortModel passwortModel) {
        this.id = passwortModel.getId();
        this.password = passwortModel.getPassword();
    }

    public PasswortModel toPasswortModel() {
        return new PasswortModel(id, password);
    }
}
