using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PasswortmanagerWPF
{
    internal abstract class Encryption
    {


        public static EntryDTO EncryptEntry(EntryDTO entry)
        {
            entry.notes = EncryptMessage(entry.notes);
            entry.password = EncryptMessage(entry.password);
            entry.username = EncryptMessage(entry.username);
            entry.title = EncryptMessage(entry.title);
            entry.url = EncryptMessage(entry.url);

            return entry;

        }


        public static EntryDTO DecryptEntry(EntryDTO entry)
        {
            entry.notes = DecryptMessage(entry.notes);
            entry.password = DecryptMessage(entry.password);
            entry.username = DecryptMessage(entry.username);
            entry.title = DecryptMessage(entry.title);
            entry.url = DecryptMessage(entry.url);

            return entry;
        }




        public static List<EntryModel> EncryptEntries(List<EntryModel> entries)
        {
            foreach (EntryModel entry in entries)
            {
                entry.notes = EncryptMessage(entry.notes);
                entry.password = EncryptMessage(entry.password);
                entry.username = EncryptMessage(entry.username);
                entry.title = EncryptMessage(entry.title);
                entry.url = EncryptMessage(entry.url);
            }

            return entries;
        }


        public static List<EntryModel> DecryptEntries(List<EntryModel> entries)
        {
            foreach (EntryModel entry in entries)
            {
                entry.notes = DecryptMessage(entry.notes);
                entry.password = DecryptMessage(entry.password);
                entry.username = DecryptMessage(entry.username);
                entry.title = DecryptMessage(entry.title);
                entry.url = DecryptMessage(entry.url);
            }

            return entries;
        }


        public static string EncryptMessage(string message, byte[] fileKey = null)
        {
            if (message == null)
            {
                return null;
            }

            using (Aes aes = Aes.Create())
            {
                if (fileKey != null)
                {
                    aes.Key = fileKey;
                }
                else
                {
                    aes.Key = UserApi.aesKey;
                }


                aes.Mode = CipherMode.ECB;

                // Verschlüssele die Nachricht
                ICryptoTransform encryptor = aes.CreateEncryptor();
                byte[] encryptedBytes = encryptor.TransformFinalBlock(
                    System.Text.Encoding.UTF8.GetBytes(message), 0, message.Length);

                string encryptedString = Convert.ToBase64String(encryptedBytes);

                return encryptedString;
            }
        }



        public static string DecryptMessage(string encryptedMessage, byte[] fileKey = null)
        {
            using (Aes aes = Aes.Create())
            {

                if (fileKey != null)
                {
                    aes.Key = fileKey;
                }
                else
                {
                    aes.Key = UserApi.aesKey;
                }

                aes.Mode = CipherMode.ECB;


                // Entschlüssele die Nachricht
                ICryptoTransform decryptor = aes.CreateDecryptor();
                byte[] encryptedBytes = Convert.FromBase64String(encryptedMessage);


                byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
                string decryptedMessage = System.Text.Encoding.UTF8.GetString(decryptedBytes);

                return decryptedMessage;
            }
        }


        public static object EncryptUser(object user)
        {
            if (user is UserModel)
            {
                UserModel userModel = (UserModel)user;

                userModel.username = EncryptMessage(userModel.username);

                foreach (EntryModel entry in userModel.entries)
                {
                    entry.notes = EncryptMessage(entry.notes);
                    entry.title = EncryptMessage(entry.title);
                    entry.password = EncryptMessage(entry.password);
                    entry.username = EncryptMessage(entry.username);
                    entry.url = EncryptMessage(entry.url);
                }


                return userModel;
            }
            else if (user is UserDTO)
            {
                UserDTO userDTO = (UserDTO)user;

                userDTO.masterKey = EncryptMessage(userDTO.masterKey);
                userDTO.username = EncryptMessage(userDTO.username);

                foreach (EntryModel entry in userDTO.entries)
                {
                    entry.notes = EncryptMessage(entry.notes);
                    entry.title = EncryptMessage(entry.title);
                    entry.password = EncryptMessage(entry.password);
                    entry.username = EncryptMessage(entry.username);
                    entry.url = EncryptMessage(entry.url);
                }


                return userDTO;
            }

            return null;
        }




        public static object DecryptUser(object user)
        {
            if (user is UserModel)
            {
                UserModel userModel = (UserModel)user;

                userModel.username = DecryptMessage(userModel.username);

                foreach (EntryModel entry in userModel.entries)
                {
                    entry.notes = DecryptMessage(entry.notes);
                    entry.title = DecryptMessage(entry.title);
                    entry.password = DecryptMessage(entry.password);
                    entry.username = DecryptMessage(entry.username);
                    entry.url = DecryptMessage(entry.url);
                }

                return userModel;
            }
            else if (user is UserDTO)
            {
                UserDTO userDTO = (UserDTO)user;

                userDTO.username = DecryptMessage(userDTO.username);

                foreach (EntryModel entry in userDTO.entries)
                {
                    entry.notes = DecryptMessage(entry.notes);
                    entry.title = DecryptMessage(entry.title);
                    entry.password = DecryptMessage(entry.password);
                    entry.username = DecryptMessage(entry.username);
                    entry.url = DecryptMessage(entry.url);
                }

                return userDTO;
            }

            return null;
        }




    }
}
