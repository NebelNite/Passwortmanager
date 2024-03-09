package com.example.Passwortmanager.Service;

import com.example.Passwortmanager.Model.EntryModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntryService {



    private final EntryRepository entryRepository;

    @Autowired
    public EntryService(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

   /*private final UserService userService;


    @Autowired
    public EntryService(UserService userService) {
        this.userService = userService;


    }
    */


    public UserModel createEntry(EntryModel entryModel, UserModel userModel) {
        userModel.addEntry(entryModel);
        entryRepository.save(entryModel);

        return userModel;
    }






/*
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
    }*/

    /*
    public boolean deleteEntry(String id) {

        for (int i = 0; i < entryModels.size(); i++) {
            EntryModel entry = entryModels.get(i);
            if (entry.getId().equals(id)) {
                entryModels.remove(i);
                return true;
            }
        }
        return false;
    }*/


}
