package com.example.Passwortmanager.Repository;

import com.example.Passwortmanager.Model.EntryModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends MongoRepository<EntryModel, String> {


}
