    package com.example.Passwortmanager.Model;

    import com.example.Passwortmanager.DTOs.PasswortDTO;
    import org.springframework.data.mongodb.core.mapping.Document;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Field;

    import java.util.ArrayList;
    import java.util.List;
    @Document(collection = "users")
    public class UserModel {

        @Id
        private String id;
        @Field("username")
        private String username;
        @Field("passwords")
        private List<PasswortModel> passwords;
        @Field("masterKey")
        private String masterKey;


        public UserModel(String id, String username, List<PasswortModel> passwords, String masterKey) {
            this.id = id;
            this.username = username;
            this.passwords = passwords;
            this.masterKey = masterKey;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public List<PasswortModel> getPasswords() {
            return passwords;
        }

        public void setPasswords(List<PasswortModel> passwords) {
            this.passwords = passwords;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getUsername() {
            return username;
        }

        public void setMasterKey(String masterKey) {
            this.masterKey = masterKey;
        }

        public String getMasterKey() {
            return masterKey;
        }

        public void addPassword(PasswortModel passwort) {
            if (passwords == null) {
                passwords = new ArrayList<>();
            }

            this.passwords.add(passwort);
        }


    }


