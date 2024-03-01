package com.example.Passwortmanager.Service;

import com.example.Passwortmanager.DTOs.UserDTO;
import com.example.Passwortmanager.Model.PasswortModel;
import com.example.Passwortmanager.Model.UserModel;
import com.example.Passwortmanager.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;
import java.util.Optional;
import static java.security.KeyRep.Type.SECRET;
import com.example.Passwortmanager.Exception.UserNotFoundException;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MongoTemplate mongoTemplate;


    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserModel createUser(UserModel user) {
        return userRepository.save(user);
    }

    public Optional<UserModel> getUserById(String id) {
        return userRepository.findById(id);
    }

    public UserModel updateUser(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel authenticateUserAsync(UserDTO userDto) {
        // Find user by username
        Query query = new Query(Criteria.where("username").is(userDto.getUsername()));
        UserModel user = mongoTemplate.findOne(query, UserModel.class);


        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        
        // Check password
        if (!bCryptPasswordEncoder.matches(userDto.getMasterKey(), user.getMasterKey())) {
            throw new BadCredentialsException("Invalid credentials");
        }


        // Generate JWT token
        String token = Jwts.builder()
                .setSubject(user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 999999999)) // Eventuell Zeit ändern
                .signWith(SignatureAlgorithm.HS512, getSecretKey())
                .compact();

        // Return user with token
        user.setToken(token);
        return user;
    }


    private Key getSecretKey() {
        String secret = "myKey";
        return new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
    }


}

