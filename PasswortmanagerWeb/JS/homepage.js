import { UserApi } from "../Class/UserApi.js";
import { EntryApi } from "../Class/EntryApi.js";
import { EntryDTO } from "../Class/EntryDTO.js";
import { EntryModel } from "../Class/EntryModel.js";
import { LoginApi } from "../Class/LoginApi.js";
import { UserDTO } from "../Class/UserDTO.js";
import { UserModel } from "../Class/UserModel.js";
import { Encryption } from "../Class/Encryption.js";

document.addEventListener('DOMContentLoaded',async () => {

  
   
    UserApi.user = await JSON.parse(sessionStorage.getItem('user'));
    UserApi.aesKey = getAesKeyForUser(UserApi.user.username);

    UserApi.user = await UserApi.getInstance().getUserById(UserApi.user.id);
    

    const app = document.getElementById('app');
    const dataGrid = document.getElementById('data-grid');
    const menuItems = document.querySelectorAll('#menu li');
    const contextMenu = document.getElementById('context-menu');
    
    const addEntryBtn = document.getElementById('addEntry');
    const editEntryBtn = document.getElementById('editEntry');
    const deleteEntryBtn = document.getElementById('deleteEntry');

    const editEntryBtnContext = document.getElementById('context-editEntry');
    const deleteEntryBtnContext = document.getElementById('context-deleteEntry');

    const entryButton = document.getElementById('entry-button');
    const fileButton = document.getElementById('file-button');
    const fileMenu = document.getElementById('file-menu');
    const entryMenu = document.getElementById('entry-menu');

    const exportButton = document.getElementById('export');
    const importButton = document.getElementById('import');
    const lockButton = document.getElementById('lock');
    const exitButton = document.getElementById('exit');

    const addEntryButton = document.getElementById('addEntry');
    const editEntryButton = document.getElementById('editEntry');
    const deleteEntryButton = document.getElementById('deleteEntry');
    
    
    exportButton.addEventListener('click', exportFunction);
    importButton.addEventListener('click', importFunction);
    lockButton.addEventListener('click', lockFunction);
    exitButton.addEventListener('click', exitFunction);

    addEntryButton.addEventListener('click', addEntry);
    editEntryButton.addEventListener('click', editEntry);
    deleteEntryButton.addEventListener('click', deleteEntry);

    deleteEntryBtnContext.addEventListener('click', deleteEntry);
    editEntryBtnContext.addEventListener('click', editEntry);

    let addEntryClicked = false;

    
    async function fillTable()
    {

        let fontSize = '18px';

        let user  = await UserApi.getInstance().getUserById(UserApi.user.id);
        const entries = user.entries;

        
        let index = 0;
        
        // Lösche alle aktuellen Zeilen in der Tabelle
        const tbody = document.querySelector('#data-grid tbody');
        tbody.innerHTML = '';
        
        // Füge alle Einträge in die Tabelle ein
        entries.forEach((entry, index) => {
        const tr = document.createElement('tr');


          tr.entry = entry;
          tr.entry = Encryption.decryptEntry(entry);
          
          
          if(tr.entry.title == 'undefined')
          {
            entry.title = ''
          }
          if(tr.entry.notes == 'undefined')
          {
              entry.notes = ''
          }
          if(tr.entry.username == 'undefined')
          {
                entry.username = ''
          }
          if(tr.entry.url == 'undefined')
          {
                entry.url = ''
          }
          if(tr.entry.password == 'undefined')
          {
                entry.password = ''
          }
          
          const tdTitle = document.createElement('td');
          tdTitle.textContent = entry.title;
          tdTitle.style.fontSize = fontSize;
          //tdTitle.classList.add('left-border');
          tdTitle.classList.add('underlined');


          tr.appendChild(tdTitle);
    
          const tdUsername = document.createElement('td');
          tdUsername.textContent = entry.username;
          tdUsername.style.fontSize = fontSize;
          tdUsername.classList.add('underlined');
          tr.appendChild(tdUsername);
    
          const tdPassword = document.createElement('td');
          tdPassword.textContent = entry.password;
          tdPassword.style.fontSize = fontSize;
          tdPassword.classList.add('underlined');
          tr.appendChild(tdPassword);
    
          const tdUrl = document.createElement('td');
          tdUrl.textContent = entry.url;
          tdUrl.style.fontSize = fontSize;
          tdUrl.classList.add('underlined');
          tr.appendChild(tdUrl);
    
          const tdNotes = document.createElement('td');
          tdNotes.textContent = entry.notes;
          tdNotes.style.fontSize = fontSize;
          tdNotes.classList.add('underlined');
          tr.appendChild(tdNotes);
          
          const tdId = document.createElement('td');
          tdId.textContent = entry.id;
          tdId.style.fontSize = '0px';
          tr.appendChild(tdId);

          tbody.appendChild(tr);
          index++;
        });
    }
  
fillTable()


    
let selectedEntry;


function hideFileEntryMenu(){
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.add('hidden');
  }
}



function exportFunction() {


  var left = window.screenX + (window.outerWidth - 800) / 2;
  var top = window.screenY - 400;
  var width = 320;
  var height = 150;

  const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;
  
  const newWindow = window.open("https://localhost:3001/passwordInput", "New Window", features);

  if (newWindow) {
    newWindow.onbeforeunload = function() {
      
      const enteredPassword = newWindow.document.getElementById("password").value;

      let jsonUser = JSON.stringify(UserApi.user);

      
      const encryptedFile = Encryption.encryptMessage(jsonUser,enteredPassword);
      
      const data = new Blob([encryptedFile], { type: 'application/json' });
      
      saveAs(data, UserApi.user.id);

      console.log();
    };
  } 
  else {
    alert("Please allow pop-ups for this website.");
  }


}





function importFunction() {

  console.log('Importing...');
}

function lockFunction() {

  window.location.href = '../login'
}

function exitFunction() {

  console.log('Exiting...');
}



async function addEntry() {
  
  addEntryClicked = true;

  await createSurveyAndEntry(null).then(() => {

    createPasswordgeneratorBtn();
    

  }).catch((error) => {
    console.log(error);
  });

  
}



function generatePassword()
{

  var left = window.screenX + (window.outerWidth - 800) / 2;
  var top = window.screenY - 400;
  var width = 800;
  var height = 600;

  const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;
  
  const newWindow = window.open("https://localhost:3001/passwordGenerator", "New Window", features);

  if (newWindow) {
    newWindow.onbeforeunload = function() {

      const password = newWindow.document.getElementById("generatedPassword").innerHTML;
      //const homepageTextbox = window.opener.document.getElementById("password-textbox");
      
      const passwordInput = document.getElementById('sq_102i');
      passwordInput.value = password;
      //homepageTextbox.value = password;
    };
  } 
  else {
    alert("Please allow pop-ups for this website.");
  }

}



function createPasswordgeneratorBtn()
{
  const passwordInput = document.getElementById('sq_102i');
 
  passwordInput.addEventListener('contextmenu', (event) => {
   
    event.preventDefault(); // Prevents the default context menu from appearing
 
    // Create the context menu
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('context-menu');
    contextMenu.innerHTML = `
      <ul>
        <li>Generate Password</li>
      </ul>
    `;
   
 
// Append the context menu to the body
document.body.appendChild(contextMenu);
 
// Position the context menu
contextMenu.style.left = `${event.clientX}px`;
contextMenu.style.top = `${event.clientY}px`;
 

// Prevent the right-click from selecting text
  document.body.addEventListener('mousedown', (event) => {
    if (event.button === 2) {
      event.preventDefault();
    }
  });
});
}





function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function createSurveyAndEntry(entry)
{
  let user = UserApi.user;
  
  const myElement = document.getElementById('surveyElement');
  myElement.style.position = 'absolute';
  myElement.style.top = '50%';
  myElement.style.left = '14%';

  
  const surveyModel = new Survey.Model({
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "text",
                    name: "title",
                    title: "Title:"
                },
                {
                    type: "text",
                    name: "username",
                    title: "Username:"
                },
                {
                    type: "text",
                    name: "password",
                    title: "Password:",
                    inputType: "password",
            },
                {
                    type: "text",
                    name: "url",
                    title: "URL:",
                },
                {
                    type: "text",
                    name: "notes",
                    title: "Notes:"
                },
                {
                  type: "text",
                  name: "id",
                  title: "ID:",
                  isHidden: true,
                  inputType: "hidden"
                },
            ],
        },
    ],
});

  surveyModel.completedHtml = " ";

  if(!addEntryClicked)
  {
      surveyModel.currentPage.getQuestionByName("id").value = entry.id;
      surveyModel.currentPage.getQuestionByName("title").value = entry.title;
      surveyModel.currentPage.getQuestionByName("username").value = entry.username;
      surveyModel.currentPage.getQuestionByName("password").value = entry.password;
      surveyModel.currentPage.getQuestionByName("url").value = entry.url;
      surveyModel.currentPage.getQuestionByName("notes").value = entry.notes;
      
  }

Survey.StylesManager.applyTheme("bootstrap");



$("#surveyElement").Survey({
    model: surveyModel,

    onComplete: async function (survey, options) {
      const userInput = survey.data;
      let entryDTO = new EntryDTO();
      
      
      entryDTO.id = surveyModel.currentPage.getQuestionByName("id").value;
      entryDTO.title = userInput.title;
      entryDTO.username = userInput.username;
      entryDTO.password = userInput.password;
      entryDTO.url = userInput.url;
      entryDTO.notes = userInput.notes;

      if(addEntryClicked)
      {
        entryDTO.id = generateGuid();

        await EntryApi.getInstance().createEntry(Encryption.encryptEntry(entryDTO))
        .then(() => {
          fillTable();
        })
        .catch((error) => {
          console.error('Error deleting entry:', error);
        });

        
        addEntryClicked = false;
      }
      else{

        await EntryApi.getInstance().editEntry(entryDTO)
        .then(() => {
          fillTable();
        })
        .catch((error) => {
          console.error('Error deleting entry:', error);
        });

      }
      
      fillTable();

    },
});



  $("#openSurveyButton").click(function () {

    
    $("#surveyElement").Survey({ 
      model: surveyModel }).render();
    
    $("#surveyElement").dialog({
        title: "User Input Form",
        modal: true,
        width: 400,
        buttons: {
          Submit: function () {
            surveyModel.currentPage.validate();
            if (surveyModel.isValid) {
                let userInput = surveyModel.data;
                console.log("Title:", userInput.title);
                console.log("Username:", userInput.username);
                console.log("Password:", userInput.password);
                console.log("URL:", userInput.url);
                console.log("Notes:", userInput.notes);
                $(this).dialog("close");
              }
            },
        },
    });
  });




  $("#surveyElement").on("dialogclose", function() {
    const entryDTO = new EntryDTO(
        user.id,
        surveyModel.data.title,
        surveyModel.data.username,
        surveyModel.data.password,
        surveyModel.data.url,
        surveyModel.data.notes
    );

  });

}




async function editEntry() {


  await createSurveyAndEntry(selectedEntry);
  
}


async function deleteEntry() {

  await EntryApi.getInstance().deleteEntry(selectedEntry)
  .then(() => {
    fillTable();
  })
  .catch((error) => {
    console.error('Error deleting entry:', error);
  });
  

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
    
    





    

    
    function getAesKeyForUser(username) {
      
      const base64Key = localStorage.getItem(username);
    
      if (!base64Key) {
        return null;
      }
      return base64Key;i
    
    
      }




      // Dropdown Menu Event Handling
function toggleMenu(menu) {
  menu.classList.toggle('hidden');
}

function hideMenu(menu) {
  if (!menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
  }
}

function hideAllMenus() {
  const menus = document.querySelectorAll('.context-menu, .dropdown-menu');
  menus.forEach(menu => menu.classList.add('hidden'));
}

entryButton.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMenu(entryMenu);
  hideMenu(fileMenu);
});

fileButton.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMenu(fileMenu);
  hideMenu(entryMenu);
});

document.addEventListener('click', hideAllMenus);
menuItems.forEach(item => item.addEventListener('click', hideAllMenus));

// Context Menu Event Handling
dataGrid.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (contextMenu.style.display === 'block') {
    contextMenu.style.display = 'none';
  } else {
    hideAllMenus();
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.top = `${event.clientY}px`;
  }
  selectedEntry = event.target.closest('tr')?.entry;
});

document.addEventListener('click', () => {
  contextMenu.style.display = 'none';
});





    })










    



















