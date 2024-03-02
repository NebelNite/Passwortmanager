package com.example.Passwortmanager.Controller;

import com.example.Passwortmanager.Model.EntryModel;
import com.example.Passwortmanager.Service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entries")
public class EntryController {

    private final EntryService entryService;


    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }

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

    @PostMapping("/create")
    public ResponseEntity<EntryModel> createEntry(@RequestBody EntryModel entryModel) {
        EntryModel createdEntry = entryService.createEntry(entryModel);
        return new ResponseEntity<>(createdEntry, HttpStatus.CREATED);
    }

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

    
}
