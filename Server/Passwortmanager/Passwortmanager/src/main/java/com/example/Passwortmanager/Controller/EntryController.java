package com.example.Passwortmanager.Controller;

import com.example.Passwortmanager.DTOs.EntryDTO;
import com.example.Passwortmanager.DTOs.UserDTO;
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
import java.util.UUID;


@CrossOrigin(origins="http://localhost:3001")
@RestController
@RequestMapping("/entries")
public class EntryController {

    private final EntryService entryService;

    private final UserService userService;

    public EntryController(EntryService entryService, UserService userService) {
        this.entryService = entryService;
        this.userService = userService;
    }




    @PostMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable("id") String id, @RequestBody UserDTO userDTO) {

        UserModel userModel = userDTO.toUserModel();

        Optional<EntryModel> entry = userModel.getEntries().stream().filter(e -> e.getId().equals(id)).findFirst();
        if (entry.isPresent()) {

            userModel.getEntries().remove(entry.get());
            userService.updateUser(userModel, null);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/editEntry/{id}")
    public ResponseEntity<Void> editEntry(@PathVariable("id") String id, @RequestBody EntryDTO entryDto) {


        Optional<UserModel> userOptional  = userService.getUserById(id);
        
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserModel user = userOptional.get();

        Optional<EntryModel> entryOptional = user.getEntries().stream()
                .filter(entry -> entry.getId().equals(entryDto.getId()))
                .findFirst();

        if (entryOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        EntryModel entry = entryOptional.get();

        entry.setTitle(entryDto.getTitle());
        entry.setUsername(entryDto.getUsername());
        entry.setPassword(entryDto.getPassword());
        entry.setUrl(entryDto.getUrl());
        entry.setNotes(entryDto.getNotes());

        userService.updateUser(user, Optional.of(entry));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
