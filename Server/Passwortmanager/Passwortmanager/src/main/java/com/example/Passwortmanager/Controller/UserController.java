package com.example.Passwortmanager.Controller;

import com.example.Passwortmanager.DTOs.EntryDTO;
import com.example.Passwortmanager.DTOs.UserDTO;
import com.example.Passwortmanager.Model.EntryModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/getUserByUsernameAndMasterKey")
    public ResponseEntity<UserDTO> getUserByUsernameAndMasterKey(@RequestBody UserDTO userDto) {
        Optional<UserModel> userOptional = userService.getUserByUsernameAndMasterKey(userDto.getUsername(), userDto.getMasterKey());

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserModel user = userOptional.get();
        userDto = new UserDTO(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }



    @PostMapping("/create")
    public ResponseEntity<UserModel> createUser(@RequestBody UserDTO userDto) {

        UserModel userModel = userDto.toUserModel();
        UserModel createdUser = userService.createUser(userModel);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }


    @PostMapping("/authenticate")
    public UserModel authenticateUser(@RequestBody UserDTO userDto) {
        return userService.authenticateUserAsync(userDto);
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") String id) {

        Optional<UserModel> userOptional = userService.getUserById(id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserModel user = userOptional.get();
        UserDTO userDto = new UserDTO(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
    

    @PostMapping("/{userId}/addEntry")
    public ResponseEntity<EntryModel> addEntry(@PathVariable("userId") String userId, @RequestBody EntryDTO entryDTO) {

        Optional<UserModel> userOptional = userService.getUserById(userId);

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserModel user = userOptional.get();
        EntryModel entryModel = entryDTO.toEntryModel();
        user.addEntry(entryModel);

        user = userService.updateUser(user);

        return new ResponseEntity<>(entryModel, HttpStatus.CREATED);
    }

    
}