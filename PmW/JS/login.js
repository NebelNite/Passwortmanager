//import CryptoJS from "../crypto-js";

import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { EntryModel } from "../Class/EntryModel.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";

































document.addEventListener('DOMContentLoaded', function() {
  
  console.log("Here");
  

/*
const axios = require('axios');
const nodeWindows = require('node-windows');
*/




/*
const { UserCredential } = require('node-windows').Credentials;
*/

/*
require(['node-windows'], function(nodeWindows) {


});



require(['axios'], function(axios) {
  
});
*/



//const axios = require('axios');


  console.log("Here");

  function isValidPassword(masterkey) {
    let output = "";
    const nonSpecialCharacters = /[^A-Za-z0-9]/;
    
    /*
    if (masterkey.length < 10) {
      output += "At least: 10 characters\n";
    }

    if (!nonSpecialCharacters.test(masterkey)) {
      output += "At least: 1 special character\n";
    }
    */

    return output;
  }


  
  function signUpButtonClick(event) {

    console.log("SignUp1");
    
    const username = document.getElementById("usernameInput").value;
    const masterkey = document.getElementById("masterKeyInput").value;

    const msg = isValidPassword(masterkey);

    if (msg.length == 0) {
      if (!aesKeyExistsForUser(username)) {
        setAesKeyForUser(username);
    }

    //UserApi.aesKey = getAesKeyForUser(username);
    let key = getAesKeyForUser(username);
    
    let userApi = UserApi.getInstance(getAesKeyForUser(username));
    
    //UserApi.setAesKey(getAesKeyForUser(username));
    
    
    console.log("Key: SignUp: " + UserApi.aesKey);


      const userDTO = new UserDTO();
      userDTO.masterKey = userApi.encryptMessage(masterkey);
      userDTO.username = userApi.encryptMessage(username);
      

      userApi.createUser(userDTO)
        .then(() => {
          console.log("SignUp successful!");
        })
        .catch((error) => {
          console.error("SignUp failed:", error);
          alert("SignUp failed!");
        });
    } else {
      alert(msg);
    }
    
    console.log("SignUp3");
  }
  
  function setAesKeyForUser(username) {

    //const aesKey = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
    const aesKey = CryptoJS.lib.WordArray.random(32);
    //const aesKeyByteArr = CryptoJS.enc.Utf8.parse(aesKey.toString(CryptoJS.enc.Utf8));
    
    const base64Key = CryptoJS.enc.Base64.stringify(aesKey);
    //const base64Key = CryptoJS.enc.Base64.stringify(aesKeyByteArr);
    
    console.log(aesKey);
    
    localStorage.setItem(username, base64Key);
    
    /*
    const aes = new Aes();
    aes.generateKey();
    const aesKey = Array.from(aes.key);
    const aesKeyBase64 = btoa(String.fromCharCode.apply(null, aesKey));
    
    const credentialSet = new Credential({
      target: "AESKey",
      username: username,
      password: aesKeyBase64,
      persistanceType: PersistanceType.LocalComputer
    });

    credentialSet.save();
    */

  }


function getAesKeyForUser(username) {
  
  const base64Key = localStorage.getItem(username);

  if (!base64Key) {
    return null;
  }

  //const aesKey = CryptoJS.enc.Base64.parse(base64Key);

  //const aesKeyByteArray = CryptoJS.enc.Hex.parse(aesKey.toString(CryptoJS.enc.Hex));
  
  console.log("Array");
 //console.log(aesKeyByteArray);
  
  return base64Key;i


  /*
  let aesKeyObj = null;
  const retrievedAesKey = localStorage.getItem(username);
  aesKeyObj = CryptoJS.enc.Base64.parse(retrievedAesKey);
  
  return aesKeyObj;

    
    const credential = new Credential({
      target: "AESKey",
      username: username
    });

    if (credential.load()) {
      const aesKeyBase64 = credential.password;
      const aesKey = Uint8Array.from(atob(aesKeyBase64), c => c.charCodeAt(0));

      return aesKey;
    } else {
      console.log("The AES key was not found.");
    }

    return null;
    */
  }


  
  function aesKeyExistsForUser(username) {
    
    console.log(username);
    
    const retrievedAesKey = localStorage.getItem(username);
    
    if (retrievedAesKey == null) {
      return false;
    } else {
      return true;
    }
    
    /*
    let credential= new Credential({
      target: "AESKey",
      username: username
    })
    
    
    console.log(credential.target);


    let credential = new UserCredential({
      target: "AESKey",
      username: username
    });


    credential.get((error, result) => {
      if (error) {
        console.error(`Error retrieving credential: ${error}`);
      } else {
        // The AES key is stored in the password property of the result object
        const aesKey = Buffer.from(result.password, 'base64');
        console.log('AES key:', aesKey.toString('hex'));
      }
    });
    */

   
  }

  function signInButtonClick(event) {
    
    const userDTO = new UserDTO();
    
    userDTO.masterKey= document.getElementById("usernameInput").value;
    userDTO.username = document.getElementById("masterKeyInput").value;

    /*
    userDTO.masterKey = document.getElementById("SignInMasterkey").value;
    userDTO.username = document.getElementById("SignInUsername").value;
    */
    //let key = getAesKeyForUser(userDTO.username);

    //UserApi.aesKey = getAesKeyForUser(userDTO.username);
    //UserApi.setAesKey(getAesKeyForUser(userDTO.username));
    
    let userApi = UserApi.getInstance(getAesKeyForUser(userDTO.username));

    console.log("Key: SignIn :" +  UserApi.aesKey);

    //userApi.aesKey = getAesKeyForUser(userDTO.username);

    userDTO.masterKey = userApi.encryptMessage(userDTO.masterKey);
    userDTO.username = userApi.encryptMessage(userDTO.username);

    userApi.authenticateUserAsync(userDTO)
      .then((user) => {

          const userJson = encodeURIComponent(JSON.stringify(user));
          const url = `../HTML/homepage.html?user=${userJson}`;
          window.location.href = url;
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        alert("Authentication failed. Please check your credentials and try again.");
      });
  }
  

  // Initialize the UserApi instance
  //UserApi.initialize();
  //UserApi.getInstance();

  // Add event listeners to the Sign Up and Sign In buttons
  document.getElementById("SignUpButton").addEventListener("click", signUpButtonClick);
  document.getElementById("SignInButton").addEventListener("click", signInButtonClick);
  


});


































































