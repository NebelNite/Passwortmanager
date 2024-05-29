package com.example.Passwortmanager.Service;

import com.example.Passwortmanager.DTOs.EntryDTO;
import com.example.Passwortmanager.DTOs.UserDTO;
import com.example.Passwortmanager.Model.EntryModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Repository.EntryRepository;
import com.example.Passwortmanager.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Optional;


import java.security.Key;

import com.example.Passwortmanager.Exception.UserNotFoundException;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final EntryRepository entryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    public UserService(UserRepository userRepository, EntryRepository entryRepository) {
        this.userRepository = userRepository;
        this.entryRepository = entryRepository;
    }



    public UserModel updateUser(UserModel userModel, Optional<EntryModel> entryModel) {

        Optional<UserModel> existingUser = userRepository.findById(userModel.getId());


        // same id
        if(entryModel != null)
        {
            if(entryModel.isPresent()) {
                Optional<EntryModel> entry = entryRepository.findById(entryModel.get().getId());

                if (entry.isPresent()) {
                    entry.get().setId(ObjectId.get().toString());
                    entryRepository.save(entry.get());
                }
            }
        }

        if (existingUser.isPresent()) {
            List<EntryModel> entries = userModel.getEntries();
            existingUser.get().setEntries(entries);

            return userRepository.save(existingUser.get());
        } else {
            return null;
        }

    }

    public UserModel createUser(UserModel user) {
        Optional<UserModel> existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Benutzername bereits vergeben");
        }

        return userRepository.save(user);
    }

    @Async
    public Optional<UserModel> getUserById(String id) {
        return userRepository.findById(id);
    }



    public UserModel authenticateUserAsync(UserDTO userDto) {

        // Find user by username
        Query query = new Query(Criteria.where("username").is(userDto.getUsername()));
        UserModel user = mongoTemplate.findOne(query, UserModel.class);


        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        // Check password
        if (!compareHashedPasswords(userDto.getMasterKey(), user.getMasterKey())) {
            throw new BadCredentialsException("Invalid credentials");
        }



        return user;
    }


    public boolean compareHashedPasswords(String hashedPassword1, String hashedPassword2) {
        if (hashedPassword1 == null || hashedPassword2 == null) {
            throw new IllegalArgumentException("Both hashed passwords must not be null");
        }

        // Remove any whitespace and convert to lowercase
        hashedPassword1 = hashedPassword1.replaceAll("\\s", "").toLowerCase();
        hashedPassword2 = hashedPassword2.replaceAll("\\s", "").toLowerCase();

        // Split the hashed passwords into byte arrays
        String[] hashedPassword1Bytes = hashedPassword1.split(":");
        String[] hashedPassword2Bytes = hashedPassword2.split(":");

        // Check that the hashed passwords have the same number of bytes
        if (hashedPassword1Bytes.length != hashedPassword2Bytes.length) {
            return false;
        }

        // Compare the hashed passwords byte by byte
        for (int i = 0; i < hashedPassword1Bytes.length; i++) {
            if (!hashedPassword1Bytes[i].equals(hashedPassword2Bytes[i])) {
                return false;
            }
        }

        // If all bytes are equal, the hashed passwords are equal
        return true;
    }




}

