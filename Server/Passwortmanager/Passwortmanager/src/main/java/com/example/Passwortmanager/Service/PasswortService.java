    package com.example.Passwortmanager.Service;
    import com.example.Passwortmanager.Model.UserModel;
    import org.springframework.stereotype.Service;
    import com.example.Passwortmanager.Model.PasswortModel;
    import com.example.Passwortmanager.Model.UserModel;
    import com.example.Passwortmanager.Repository.PasswortRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import com.example.Passwortmanager.Model.PasswortModel;
    import com.example.Passwortmanager.Repository.PasswortRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.Optional;

    @Service
    public class PasswortService {

        private final PasswortRepository passwordRepository;

        @Autowired
        public PasswortService(PasswortRepository passwordRepository) {
            this.passwordRepository = passwordRepository;
        }

        public PasswortModel createPassword(PasswortModel password) {
            return passwordRepository.save(password);
        }

        public PasswortModel getPassword(String id) {
            return passwordRepository.findById(id).orElse(null);
        }

        public Optional<PasswortModel> getPasswordById(String id) {
            return passwordRepository.findById(id);
        }

        // Weitere Methoden für die Geschäftslogik
    }