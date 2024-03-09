package com.example.Passwortmanager.Controller;

import com.example.Passwortmanager.DTOs.EntryDTO;
import com.example.Passwortmanager.Model.EntryModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Service.EntryService;
import com.example.Passwortmanager.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/entries")
public class EntryController {

    private final EntryService entryService;

    private final UserService userService;

    public EntryController(EntryService entryService, UserService userService) {
        this.entryService = entryService;
        this.userService = userService;
    }

    /*
    @GetMapping
    public ResponseEntity<List<EntryModel>> getAllEntries() {
        List<EntryModel> entries = entryService.getAllEntries();
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntryModel> getEntryById(@PathVariable("id") String id) {
        EntryModel entry = entryService.getEntryById(id);
        if (entry != null) {
            return new ResponseEntity<>(entry, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
*/
    @PostMapping("/create")
    public ResponseEntity<UserModel> createEntry(@RequestBody EntryModel entryModel, UserModel userModel) {
        UserModel createdEntry = entryService.createEntry(entryModel, userModel);
        return new ResponseEntity<>(userModel, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable("id") String id, UserModel userModel) {
        Optional<EntryModel> entry = userModel.getEntries().stream().filter(e -> e.getId().equals(id)).findFirst();
        if (entry.isPresent()) {

            userModel.getEntries().remove(entry.get());
            userService.updateUser(userModel);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

/*
    @PutMapping("/{id}")
    public ResponseEntity<EntryModel> updateEntry(@PathVariable("id") String id, @RequestBody EntryModel entryModel) {
        EntryModel updatedEntry = entryService.updateEntry(id, entryModel);
        if (updatedEntry != null) {
            return new ResponseEntity<>(updatedEntry, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable("id") String id) {
        boolean deleted = entryService.deleteEntry(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
*/
    
}
