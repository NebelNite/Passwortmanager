package com.example.Passwortmanager.Service;

import com.example.Passwortmanager.DTOs.UserDTO;
import com.example.Passwortmanager.Model.EntryModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Repository.EntryRepository;
import com.example.Passwortmanager.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.security.authentication.BadCredentialsException;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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

/*
    public UserModel updateUser(UserModel updatedUser, EntryDTO entryDTO) {

        Optional<UserModel> existingUserOptional = userRepository.findById(updatedUser.getId());

        if (existingUserOptional.isEmpty()) {
            throw new UserNotFoundException("User with ID " + updatedUser.getId() + " not found");
        }

        // Benutzer aus der Optional-Instanz abrufen
        UserModel existingUser = existingUserOptional.get();

        // Die Felder des vorhandenen Benutzers mit den aktualisierten Werten aktualisieren
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setMasterKey(updatedUser.getMasterKey());
        existingUser.addEntry(entryDTO.toEntryModel());

        return userRepository.save(existingUser);
    }
*/

    public UserModel updateUser(UserModel userModel) {

        Optional<UserModel> existingUser = userRepository.findById(userModel.getId());

        if (existingUser.isPresent()) {
            List<EntryModel> entries = userModel.getEntries();
            existingUser.get().setEntries(entries);

            //entryRepository.save(entries);

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

    public Optional<UserModel> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<UserModel> getUserByUsernameAndMasterKey(String username, String masterKey) {
        return userRepository.findByUsernameAndMasterKey(username, masterKey);
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



        // Generate JWT token
        String token = Jwts.builder()
                .setSubject(user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 999999999))
                .signWith(SignatureAlgorithm.HS512, getSecretKey())
                .compact();

        // Return user with token
        user.setToken(token);
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


    private Key getSecretKey() {
        String secret = "myKey";
        return new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
    }


}

