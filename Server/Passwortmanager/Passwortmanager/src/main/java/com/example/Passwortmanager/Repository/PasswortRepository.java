package com.example.Passwortmanager.Repository;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.example.Passwortmanager.Model.PasswortModel;
import com.example.Passwortmanager.Model.PasswortModel;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;
import com.example.Passwortmanager.Model.PasswortModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public interface PasswortRepository extends MongoRepository<PasswortModel, String> {


}
