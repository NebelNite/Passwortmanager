
import { UserApi } from "../Class/UserApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { Encryption } from "../Class/Encryption.js";



document.addEventListener('DOMContentLoaded', function() {
  
  function isValidPassword(masterkey) {
    let output = "";
    const nonSpecialCharacters = /[^A-Za-z0-9]/;

    return output;
  }


  
  async function signUpButtonClick(event) {

    
    const username = document.getElementById("usernameInput").value;
    const masterkey = document.getElementById("masterKeyInput").value;

    const msg = isValidPassword(masterkey);

    if (msg.length == 0) {
      if (!aesKeyExistsForUser(username)) {
        setAesKeyForUser(username);
        UserApi.aesKey = getAesKeyForUser(username);
    }

    const userDTO = new UserDTO();

    userDTO.masterKey = Encryption.encryptMessage(masterkey).toString();
    userDTO.username = Encryption.encryptMessage(username).toString();

    userDTO.id = null;
      
    
    await UserApi.getInstance().createUser(userDTO)
      .then(() => {
        console.log("SignUp successful!");
      })
      .catch((error) => {
        console.error("SignUp failed:", error);
        alert("SignUp failed!");
      });
      } 
      else {
        alert(msg);
      }
    }
  
  function setAesKeyForUser(username) {

    const keyLength = 256 / 8; // 256 bits (AES-256)
    const aes256Key = CryptoJS.lib.WordArray.random(keyLength);
    console.log(aes256Key);

    localStorage.setItem(username, aes256Key);

  }


function getAesKeyForUser(username) {
  
  const stringKey = localStorage.getItem(username);
  const aes256Key = CryptoJS.enc.Hex.parse(stringKey);

  if(aes256Key == null)
  {
      return false;
  }
  return aes256Key;
  }


  
  function aesKeyExistsForUser(username) {
    

    const retrievedAesKey = localStorage.getItem(username);
    
    if (retrievedAesKey == null) {
      return false;
    } else {
      return true;
    }

  }

  async function signInButtonClick(event) {
    
    
    const userDTO = new UserDTO();
    let masterKey = document.getElementById("usernameInput").value;
    let username = document.getElementById("masterKeyInput").value;

    userDTO.masterKey= masterKey
    userDTO.username = username
    
    UserApi.aesKey = getAesKeyForUser(userDTO.username);

    
    

    userDTO.masterKey = Encryption.encryptMessage(userDTO.masterKey).toString();
    userDTO.username = Encryption.encryptMessage(userDTO.username).toString();

    UserApi.user = await UserApi.getInstance().authenticateUser(userDTO);
    
    UserApi.user.username = Encryption.decryptMessage(UserApi.user.username);
    
    if(UserApi.user.id.length > 1)
    {
     
      sessionStorage.setItem('user', JSON.stringify(UserApi.user));
      window.location.href = '../homepage';

    }
    else {
      alert("Authentication failed. Please check your credentials and try again.");
  }

  }
  

  document.getElementById("SignUpButton").addEventListener("click", signUpButtonClick);
  document.getElementById("SignInButton").addEventListener("click", signInButtonClick);
  


});



































































