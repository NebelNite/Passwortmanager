package com.example.Passwortmanager.Service;

import com.example.Passwortmanager.Model.EntryModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EntryService {

    private List<EntryModel> entryModels = new ArrayList<>();
    
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

    public EntryModel createEntry(EntryModel entryModel) {
        entryModels.add(entryModel);
        return entryModel;
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
