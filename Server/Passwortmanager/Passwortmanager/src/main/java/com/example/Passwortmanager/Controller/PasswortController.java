package com.example.Passwortmanager.Controller;

import com.example.Passwortmanager.DTOs.PasswortDTO;
import com.example.Passwortmanager.DTOs.UserDTO;
import com.example.Passwortmanager.Model.PasswortModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Service.PasswortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/passwords")
public class PasswortController {

    @Autowired
    private final PasswortService passwortService;

    @Autowired
    public PasswortController(PasswortService passwortService) {
        this.passwortService = passwortService;
    }



    @GetMapping("/{id}")
    public ResponseEntity<PasswortDTO> getPassword(@PathVariable("id") String id) {
        Optional<PasswortModel> passwordOptional = passwortService.getPasswordById(id);
        if (passwordOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        PasswortModel password = passwordOptional.get();
        PasswortDTO passwortDto = new PasswortDTO(password);
        return new ResponseEntity<>(passwortDto, HttpStatus.OK);
    }


}