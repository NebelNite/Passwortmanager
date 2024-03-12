    package com.example.Passwortmanager.Model;

    import org.springframework.data.mongodb.core.mapping.Document;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Field;

    import java.util.ArrayList;
    import java.util.List;
    import java.util.UUID;

    @Document(collection = "users")
    public class UserModel {

        @Id
        private String id;
        @Field("username")
        private String username;
        @Field("entries")
        private List<EntryModel> entries;
        @Field("masterKey")
        private String masterKey;
        
        private String token;

        public UserModel(String id, String username, List<EntryModel> entries, String masterKey) {
            this.id = id;
            this.username = username;
            this.entries = entries;
            this.masterKey = masterKey;
        }




        public void setToken(String token) {
            this.token = token;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public List<EntryModel> getEntries() {
            return entries;
        }

        /*public void setPasswords(List<EntryModel> passwords) {
            this.passwords = passwords;
        }*/

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
        


        public void addEntry(EntryModel entry) {
            if (entries == null) {
                entries = new ArrayList<>();
            }
            /*
            String newId = UUID.randomUUID().toString();
            entry.setId(newId);
            */

            this.entries.add(entry);
        }

        public void setEntries(List<EntryModel> entries)
        {
            this.entries = entries;
        }


    }


