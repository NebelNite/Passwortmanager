package com.example.Passwortmanager.DTOs;

import com.example.Passwortmanager.Model.PasswortModel;
import com.example.Passwortmanager.Model.UserModel;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDTO {

        private String id;
        private String username;
        private List<PasswortDTO> passwords;
        private String masterKey;

    public UserDTO() {
    }


    public UserDTO(UserModel userModel) {
        this.id = userModel.getId();
        this.username = userModel.getUsername();
        this.passwords = userModel.getPasswords().stream()
                .map(password -> new PasswortDTO(password))
                .collect(Collectors.toList());
        this.masterKey = userModel.getMasterKey();
    }
    
    public UserModel toUserModel() {
        List<PasswortModel> passwords = new ArrayList<>();

        for (PasswortDTO passwortDTO : this.passwords) {
            PasswortModel passwortModel = passwortDTO.toPasswortModel();
            passwords.add(passwortModel);
        }
        return new UserModel(this.id, this.username, passwords, this.masterKey);
    }

}
