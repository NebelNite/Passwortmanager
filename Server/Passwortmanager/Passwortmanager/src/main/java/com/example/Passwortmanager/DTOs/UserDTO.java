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
