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


    public UserModel createEntry(EntryModel entryModel, UserModel userModel) {
        userModel.addEntry(entryModel);
        entryRepository.save(entryModel);

        return userModel;
    }

    


}
