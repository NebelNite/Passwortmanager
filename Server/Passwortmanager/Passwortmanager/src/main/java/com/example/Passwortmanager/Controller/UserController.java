package com.example.Passwortmanager.Controller;

import com.example.Passwortmanager.DTOs.PasswortDTO;
import com.example.Passwortmanager.DTOs.UserDTO;
import com.example.Passwortmanager.Model.PasswortModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
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
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") String id) {
        Optional<UserModel> userOptional = userService.getUserById(id);
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UserModel user = userOptional.get();
        UserDTO userDto = new UserDTO(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }


    @PostMapping("/{userId}/addPassword")
    public ResponseEntity<PasswortModel> addOnePassword(@PathVariable("userId") String userId, @RequestBody PasswortDTO passwortDto) {
        
        Optional<UserModel> userOptional = userService.getUserById(userId);

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserModel user = userOptional.get();
        PasswortModel passwortModel = passwortDto.toPasswortModel();
        user.addPassword(passwortModel);

        user = userService.updateUser(user);

        return new ResponseEntity<>(passwortModel, HttpStatus.CREATED);
    }


    // Weitere REST-Endpunkte und Methoden für CRUD-Operationen
}