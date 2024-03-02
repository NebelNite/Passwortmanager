package com.example.Passwortmanager.DTOs;

import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Model.EntryModel;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDTO {

    private String id;
    private String username;
    private List<EntryDTO> entries;
    private String masterKey;

    public UserDTO() {
    }

    public UserDTO(UserModel userModel) {
        this.id = userModel.getId();
        this.username = userModel.getUsername();
        this.entries = userModel.getEntries().stream()
                .map(entry -> new EntryDTO(entry))
                .collect(Collectors.toList());
        this.masterKey = userModel.getMasterKey();
    }

    public UserDTO(String id, String username, List<EntryDTO> entries, String masterKey) {
        this.id = id;
        this.username = username;
        this.entries = entries;
        this.masterKey = masterKey;
    }

    public UserDTO(String username, String masterKey) {
        this.username = username;
        this.masterKey = masterKey;
    }

    public UserDTO(String username, List<EntryDTO> entries, String masterKey) {
        this.username = username;
        this.entries = entries;
        this.masterKey = masterKey;
    }

    public UserModel toUserModel() {
        List<EntryModel> entries = new ArrayList<>();

        if (this.entries != null) {
            for (EntryDTO entryDTO : this.entries) {
                EntryModel entryModel = entryDTO.toEntryModel();
                entries.add(entryModel);
            }
        }

        return new UserModel(this.id, this.username, entries, this.masterKey);
    }
}
