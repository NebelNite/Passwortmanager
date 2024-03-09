package com.example.Passwortmanager.Repository;

import com.example.Passwortmanager.*;
import com.example.Passwortmanager.Model.UserModel;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {

    UserModel save(UserModel user);

    Optional<UserModel> findByUsernameAndMasterKey(String username, String masterKey);
    Optional<UserModel> findByUsername(String username);
    
    /*
    @Override
    default <S extends UserModel> S save(S entity) {
        return super.save(entity);
    }*/

}
