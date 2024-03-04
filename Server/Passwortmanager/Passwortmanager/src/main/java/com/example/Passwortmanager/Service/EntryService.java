package com.example.Passwortmanager.Service;

import com.example.Passwortmanager.Model.EntryModel;
import com.example.Passwortmanager.Model.UserModel;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Passwortmanager.Service.UserService;
import java.util.ArrayList;
import java.util.List;

@Service
public class EntryService {


    private List<EntryModel> entryModels = new ArrayList<>(); // alt


   /*private final UserService userService;


    @Autowired
    public EntryService(UserService userService) {
        this.userService = userService;


    }
    */


    public UserModel createEntry(EntryModel entryModel, UserModel userModel) {
        userModel.addEntry(entryModel);

        return userModel;
    }


    public List<EntryModel> getAllEntries() {
        return entryModels;
    }

    public EntryModel getEntryById(String id) {
        for (EntryModel entry : entryModels) {
            if (entry.getId().equals(id)) {
                return entry;
            }
        }
        return null;
    }



    public EntryModel updateEntry(String id, EntryModel entryModel) {
        for (int i = 0; i < entryModels.size(); i++) {
            EntryModel entry = entryModels.get(i);
            if (entry.getId().equals(id)) {
                entryModels.set(i, entryModel);
                return entryModel;
            }
        }
        return null;
    }

    public boolean deleteEntry(String id) {

        for (int i = 0; i < entryModels.size(); i++) {
            EntryModel entry = entryModels.get(i);
            if (entry.getId().equals(id)) {
                entryModels.remove(i);
                return true;
            }
        }
        return false;
    }


}
