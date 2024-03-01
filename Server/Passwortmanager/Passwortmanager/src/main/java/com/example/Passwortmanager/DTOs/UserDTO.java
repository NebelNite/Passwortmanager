package com.example.Passwortmanager.DTOs;
import com.example.Passwortmanager.Model.PasswortModel;
import com.example.Passwortmanager.Model.UserModel;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
//import com.example.SharedLibrary.*;

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

    public UserDTO(String id, String username, List<PasswortDTO> passwords, String masterKey) {
        this.id = id;
        this.username = username;
        this.passwords = passwords;
        this.masterKey = masterKey;
    }

    public UserDTO(String username, String masterKey) {
        this.username = username;
        this.masterKey = masterKey;
    }
    public UserDTO(String username, List<PasswortDTO> passwords, String masterKey) {
        this.username = username;
        this.passwords = passwords;
        this.masterKey = masterKey;
    }


    public UserModel toUserModel() {
        List<PasswortModel> passwords = new ArrayList<>();

        if(this.passwords != null)
        {
            for (PasswortDTO passwortDTO : this.passwords) {
                PasswortModel passwortModel = passwortDTO.toPasswortModel();
                passwords.add(passwortModel);
            }
        }

        return new UserModel(this.id, this.username, passwords, this.masterKey);
    }

}
