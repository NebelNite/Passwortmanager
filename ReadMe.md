# Passwortmanager


## Inhaltsverzeichnis
- [Passwortmanager](#passwortmanager)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Einführung](#einführung)
    - [Zweck des Passwortmanagers](#zweck-des-passwortmanagers)
    - [Motivation](#motivation)
    - [Bestandteile](#bestandteile)
  - [Softwarestruktur](#softwarestruktur)
    - [Funktionalitäten des Passwortmanagers](#funktionalitäten-des-passwortmanagers)
    - [Sicherheit und Verschlüsselung](#sicherheit-und-verschlüsselung)
    - [Technologien](#technologien)
  - [Installation](#installation)
  - [Server](#server)
    - [Spring-Boot](#spring-boot)
    - [API](#api)
      - [Routen](#routen)
        - [**UserController** (`/users`):](#usercontroller-users)
        - [Create](#create)
        - [Authenticate](#authenticate)
        - [Id](#id)
        - [getUserByUsernameAndMasterKey](#getuserbyusernameandmasterkey)
        - [**EntryController** (`/entries`):](#entrycontroller-entries)
        - [addEntry](#addentry)
        - [deleteEntry](#deleteentry)
        - [editEntry](#editentry)
      - [Actuator](#actuator)
    - [Datenbank](#datenbank)
      - [Benutzer (UserModel)](#benutzer-usermodel)
      - [Eintrag (EntryModel)](#eintrag-entrymodel)
- [Clients](#clients)
  - [Wichtige Klassen](#wichtige-klassen)
    - [API](#api-1)
    - [Models \& DTOs](#models--dtos)
    - [Encryption](#encryption)
    - [Diagramm](#diagramm)
  - [WPF-Application](#wpf-application)
    - [Wichtige Methoden](#wichtige-methoden)
      - [UserApi](#userapi)
        - [CreateUserAsync:](#createuserasync)
        - [AuthenticateUserAsync](#authenticateuserasync)
        - [GetUserById](#getuserbyid)
      - [EntryApi](#entryapi)
        - [CreateEntry](#createentry)
        - [EditEntry](#editentry-1)
        - [DeleteEntry](#deleteentry-1)
  - [Web-Application](#web-application)
    - [Einführung](#einführung-1)
    - [Technologien](#technologien-1)
    - [Probleme](#probleme)
    - [NodeJS Config](#nodejs-config)
    - [SpringBoot Config](#springboot-config)
  - [Diskussion der Ergebnisse](#diskussion-der-ergebnisse)
    - [Zusammenfassung](#zusammenfassung)
    - [Ausblick](#ausblick)
      - [Sicherheit und Verschlüsselung](#sicherheit-und-verschlüsselung-1)
      - [Passwortrichtlinien](#passwortrichtlinien)
      - [Autofill](#autofill)




## <u>Einführung</u>
### Zweck des Passwortmanagers

Der Zweck des Passwortmanagers besteht darin, sensible Zugangsdaten wie Benutzernamen, Passwörter und andere vertrauliche Informationen sicher zu speichern und zu verwalten. Dies ermöglicht es Benutzern, sichere Passwörter zu generieren, ohne sich die Kennwörter merken zu müssen.

### Motivation
Die Entwicklung eines Passwortmanagers halte ich persönlich für interessant, da ich selbst regelmäßig einen Passwortmanager verwende. Daher ergab sich im Rahmen dieses Projekts die Möglichkeit sich mehr mit diesem Typ von Projekt auseinanderzusetzen.

### Bestandteile

Das Projekt besteht aus folgenden Hauptkomponenten:

- **Server**: Die Backend-Komponente, die mithilfe von Spring Boot implementiert ist. Der Server ist verantwortlich für die Verarbeitung von Anfragen der Clients, die Datenbankinteraktion und die Bereitstellung von RESTful Web Services (CRUD).

- **WPF-Client**: Ein Desktop-Client, der in C# implementiert ist. Dieser Client bietet eine grafische Benutzeroberfläche für die Benutzer des Passwortmanagers. Mit dem WPF-Client können Benutzer ihre Passwortdaten verwalten und verschiedene Funktionen des Passwortmanagers nutzen.


- **Web-Client**: Ein webbasierte Client-Anwendung, die mithilfe von HTML, Java und CSS entwickelt ist. Der Web-Client bietet eine plattformübergreifende Benutzeroberfläche für den Zugriff auf den Passwortmanager über einen Webbrowser. Benutzer können sich über den Web-Client anmelden, ihre Passwortdaten anzeigen und verwalten sowie verschiedene Funktionen des Passwortmanagers nutzen.
  


## Softwarestruktur

```mermaid
graph TD;
    B[API]
    B -->| Speichert/Ruft ab| C[Datenbank]
    E[Web-Client] -->|Kommuniziert mit| B
    F[WPF-Client] -->|Kommuniziert mit| B


```


### Funktionalitäten des Passwortmanagers
Die Funktionalitäten des Passwortmanagers umfassen folgende Aspekte:


- **Passwortspeicherung und -verwaltung**: Der Passwortmanager ermöglicht es Benutzern, ihre Passwörter sicher zu speichern und zu organisieren.

- **Automatische Passwortgenerierung**: Der Passwortmanager hilft Benutzern starke Passwörter für ihre Konten zu generieren um die Sicherheit zu verbessern.

- **Verschlüsselung**: Die Daten werden im Passwortmanager verschlüsselt, um sie vor unbefugtem Zugriff zu schützen. Dies gewährleistet die Sicherheit der gespeicherten Passwörter.

- **Benutzerauthentifizierung**: Um auf die gespeicherten Passwörter zugreifen zu können, muss sich der Benutzer mit seinem Master-Passwort anmelden.

### Sicherheit und Verschlüsselung

Alle sensiblen Daten, einschließlich Passwörter und Zugangsdaten, werden mit dem Advanced Encryption Standard (AES) verschlüsselt. Diese Verschlüsselung erfolgt Ende-zu-Ende.

Zusätzlich zur AES-Verschlüsselung wird der Masterkey, der für den Zugriff der Einträge benötigt wird, ebenfalls gehasht, um die Sicherheit zu erhöhen.


### Technologien

- **Spring Framework**: Verwendet für die Erstellung des RESTful Web Services und die Implementierung der Backend-Logik.
- **Spring Boot**: Verwendet für die schnelle Entwicklung von Spring-Anwendungen und die Automatisierung des Konfigurationsprozesses.
- **MongoDB**: Als NoSQL-Datenbank verwendet, um die Benutzer- und Eintragsdaten persistent zu speichern.
- **Java**: Verwendet als Programmiersprache für die Entwicklung der Serveranwendung.
- **Markdown**: Zur Dokumentation und Formatierung der Projektdokumentation verwendet.


## <u>Installation</u>

Um den Passwortmanager zu installieren und nutzen zu können, müssen Sie die folgenden Schritte ausführen:

1. Das Projekt herunterladen und anschließend entzippen.
2. Öffnen Sie den Ordner 'Server' mit InteliJ oder einer IDE Ihrer Wahl und führen sie die Datei 'PasswortmanagerApplication.java' aus.
3. Nun wo der Server seinen Service bereit stellt, können Sie einen der beiden Clients starten und ebenfalls ausführen.
4. Haben Sie sich für den WPF-Client entscheiden, öffnen Sie die Datei mit dem Namen 'PasswortmanagerWPF.sln' und drücken Sie, nachdem sich das Projekt in VS geöffnet hat, ```F5``` um das Projekt auszuführen.
5. Um den Web-Client zu starten, öffnen sie den Ordner 'PasswortmanagerWeb' in VS Code und geben sie anschließend ```npm start``` im Terminal ein. Der Dienst sollte nun unter https://localhost:3001/login erreichbar sein.



## <u>Server</u>

### Spring-Boot
Die Spring-Boot-Anwendung bildet das Backend des Passwortmanagers. Sie verwendet das Spring-Framework für die Erstellung von RESTful Web Services. Die Hauptfunktionalitäten des Servers umfassen die Verarbeitung von Anfragen von Clients, die Authentifizierung und Autorisierung von Benutzern sowie die Interaktion mit der Datenbank zur Speicherung und Abruf von Benutzer- und Eintragsdaten.

### API
Die API des Servers definiert verschiedene Endpunkte, über die Clients mit der Anwendung interagieren können. Diese Endpunkte ermöglichen das Erstellen, Lesen, Aktualisieren und Löschen von Einträgen.

Der Server stellt zwei Controller bereit: 
* EntryController
* UserController

Die einzelnen Endpunkte der Controller sind erreichar unter
* /entries
* /users
 


#### Routen

##### **UserController** (`/users`):

##### Create
- `/create`: Ein POST-Endpunkt, der verwendet wird, um einen neuen Benutzer in der DB zu speichern. Der Client sendet Benutzerdaten an diesen Endpunkt, und der Server erstellt dann den entsprechenden Benutzer in der DB.
  

```mermaid
graph TD;
    A[Neuer Benutzer] -->|Gibt Benutzernamen und Master-Key ein| B[Passwortmanager]
    B -->|Speichert neuen Benutzer in der Datenbank| C{Speichern erfolgreich?}
    C -- Ja --> D[Benutzer registriert]
    C -- Nein --> E[Fehlermeldung anzeigen]
```




##### Authenticate
- `/authenticate`: Ein POST-Endpunkt, der für die Benutzeranmeldung verwendet wird. Der Client sendet Anmeldeinformationen an diesen Endpunkt, und der Server überprüft die Gültigkeit dieser Informationen. Wenn die Anmeldeinformationen korrekt sind und in der DB enthalten sind, wird der Benutzer angemeldet und erhält Zugriff auf die Daten.

```mermaid
graph TD;
    A[Benutzer] -->|Gibt Benutzername und Master-Key ein| B[Passwortmanager]
    B -->|Überprüft Anmeldeinformationen| C{Anmeldeinformationen korrekt?}
    C -- Ja --> D[Authentifizierung erfolgreich]
    D --> E[Zeige Passwortdaten an]
    C -- Nein --> F[Authentifizierung fehlgeschlagen]
    F --> G[Fehlermeldung anzeigen]
```

##### Id
- `/{id}`: Ein GET-Endpunkt, der verwendet wird, um Benutzerdetails anhand der Benutzer-ID abzurufen. Der Client kann die Benutzer-ID als Teil der URL bereitstellen, und der Server gibt dann die Details des entsprechenden Benutzers zurück.

```mermaid
graph TD;
    A[Benutzer] -->|Sendet Anfrage mit Benutzer-ID| B[Passwortmanager]
    B -->|Sucht nach Benutzer in der Datenbank| C{Benutzer gefunden?}
    C -- Ja --> D[Benutzerdaten zurückgeben]
    C -- Nein --> E[Fehlermeldung anzeigen]
```

##### getUserByUsernameAndMasterKey
- `/getUserByUsernameAndMasterKey`: Ein POST-Endpunkt, der verwendet wird, um einen Benutzer anhand seines Benutzernamens und seines Master-Passworts abzurufen. Der Client sendet Benutzerdaten an diesen Endpunkt, und der Server gibt den entsprechenden Benutzer zurück, falls vorhanden.

```mermaid
graph TD;
    A[Benutzer] -->|Sendet Anfrage mit Benutzername und Master-Key| B[Passwortmanager]
    B -->|Sucht nach Benutzer in der Datenbank| C{Benutzer gefunden?}
    C -- Ja --> D[Benutzerdaten zurückgeben]
    C -- Nein --> E[Fehlermeldung anzeigen]
```

##### **EntryController** (`/entries`):

##### addEntry
- `/addEntry/{userId}`: Ein POST-Endpunkt, der verwendet wird, um einen neuen Eintrag für einen bestimmten Benutzer hinzuzufügen. Der Client sendet Eintragsdaten an diesen Endpunkt, und der Server fügt dann den Eintrag zur Liste der Einträge des Benutzers hinzu.
  
```mermaid
graph TD;
    A[Benutzer] -->|Erstellt neuen Eintrag| B[Passwortmanager]
    B -->|Speichert Eintrag in der Datenbank| C{Speichern erfolgreich?}
    C -- Ja --> D[Eintrag hinzugefügt]
    C -- Nein --> E[Eintrag nicht hinzugefügt]
```

##### deleteEntry
- `/delete/{id}`: Ein POST-Endpunkt, der verwendet wird, um einen Eintrag anhand seiner ID zu löschen. Der Client sendet die ID des zu löschenden Eintrags an diesen Endpunkt, und der Server löscht dann den Eintrag aus der DB.

```mermaid
graph TD;
    A[Benutzer] -->|Wählt Eintrag zum Löschen aus| B[Passwortmanager]
    B -->|Löscht Eintrag aus der Datenbank| C{Löschen erfolgreich?}
    C -- Ja --> D[Eintrag gelöscht]
    C -- Nein --> E[Eintrag besteht weiterhin in der Datenbank]
```

##### editEntry
- `/editEntry/{id}`: Ein POST-Endpunkt, der verwendet wird, um einen Eintrag anhand seiner ID zu bearbeiten. Der Client sendet aktualisierte Eintragsdaten an diesen Endpunkt, und der Server aktualisiert dann die entsprechenden Eintragsdetails in der DB.

```mermaid
graph TD;
    A[Benutzer] -->|Wählt Eintrag zum Bearbeiten aus| B[Passwortmanager]
    B -->|Zeigt Formular zur Bearbeitung an| C[Benutzer aktualisiert Eintrag]
    C -->|Speichert aktualisierte Eintrag in der Datenbank| D{Aktualisierung erfolgreich?}
    D -- Ja --> E[Eintrag aktualisiert]
    D -- Nein --> F[Eintrag bleibt unverändert]
```

#### Actuator
- `/actuator/health`: Der Actuator bietet die Möglichkeit, den Zustand des Servers zu überwachen und abzurufen, indem der Status der einzelnen Module des Servers regelmäßig geprüft werden ([Heartbeat](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints.health)). 
Der Actuator kennt dabei folgende Zustände, die dann über die Route abrufbar sind:
  - `UP`
  - `DOWN`
  - `OUT_OF_SERVICE`
  - `UNKNOWN`
  
  
### Datenbank  
Die Anwendung verwendet MongoDB als Datenbank und speichert folgende Klassen:

#### Benutzer (UserModel)

- **id**: Die eindeutige Kennung des Benutzers.
- **username**: Der Benutzername des Benutzers.
- **entries**: Eine Liste von Einträgen, die diesem Benutzer zugeordnet sind.
- **masterKey**: Der Master-Key des Benutzers, der für die Authentifizierung verwendet wird.
  
#### Eintrag (EntryModel)

- **id**: Die eindeutige Kennung des Eintrags.
- **title**: Der Titel des Eintrags.
- **username**: Der Benutzername für den Eintrag.
- **password**: Das Passwort für den Eintrag.
- **url**: Die URL, die mit diesem Eintrag verknüpft ist.
- **notes**: Zusätzliche Notizen oder Informationen zu diesem Eintrag.


# Clients

## Wichtige Klassen

### API
Diese Klassen enthalten alle Methoden, die mit dem Spring Boot Server kommunizieren. Die Beziehungen zwischen diesen Klassen ist im Diagramm dargestellt.

```
- LoginApi.js
- EntryApi.js
- UserApi.js
```

```mermaid
classDiagram
    class LoginApi {
    }
    class EntryApi {
    }
    class UserApi {
    }

    LoginApi <|-- EntryApi
    LoginApi <|-- UserApi
```

### Models & DTOs
Diese Klassen definieren die Struktur der Benutzerdaten. Die Models dienen der internen Verarbeitung, während die DTOs verwendet werden, um Daten mit dem Server auszutauschen.
```
- UserModel.js / UserDTO.js
- EntryModel.js / EntryDTO.js
```

### Encryption
Diese Klasse enthält Methoden deren einzige Aufgabe darin besteht, sensible Daten zu verschlüsseln und entschlüsseln.

```
- Encryption.js
```

### Diagramm


```mermaid
classDiagram
    class Encryption {
        +string Encrypt(string data)
        +string Decrypt(string data)
    }

    class EntryApi {
        +List<EntryDTO> GetAllEntries()
        +EntryDTO GetEntryById(int id)
        +void AddEntry(EntryDTO entry)
        +void UpdateEntry(EntryDTO entry)
        +void DeleteEntry(int id)
    }

    class EntryDTO {
        +int Id
        +string Title
        +string Username
        +string Password
        +string Url
        +string Notes
    }

    class EntryModel {
        +int Id
        +string Title
        +string Username
        +string Password
        +string Url
        +string Notes
        +void EncryptData()
        +void DecryptData()
    }

    class LoginApi {
        +bool Login(string username, string password)
        +void Logout()
    }

    class UserApi {
        +UserDTO GetUserById(int id)
        +void AddUser(UserDTO user)
        +void UpdateUser(UserDTO user)
        +void DeleteUser(int id)
    }

    class UserDTO {
        +int Id
        +string Username
        +string Password
        +string Email
    }

    class UserModel {
        +int Id
        +string Username
        +string Password
        +string Email
        +void EncryptData()
        +void DecryptData()
    }

    class EntryWindow {
        +void InitializeComponent()
        +void LoadEntries()
        +void AddEntry()
        +void EditEntry()
        +void DeleteEntry()
    }

    class LoginWindow {
        +void InitializeComponent()
        +void Login()
        +void Logout()
    }

    class MainWindow {
        +void InitializeComponent()
        +void OpenEntryWindow()
        +void OpenPasswordGeneratorWindow()
    }

    class PasswordGeneratorWindow {
        +void InitializeComponent()
        +string GeneratePassword(int length)
    }

    class PasswordInputWindow {
        +void InitializeComponent()
        +void AcceptPassword()
        +void Cancel()
    }

    EntryApi --> EntryDTO
    EntryModel --> EntryDTO
    UserApi --> UserDTO
    UserModel --> UserDTO
    EntryWindow --> EntryApi
    LoginWindow --> LoginApi
    MainWindow --> EntryWindow
    MainWindow --> PasswordGeneratorWindow
    PasswordInputWindow --> EntryWindow
```


## <u>WPF-Application</u>


### Wichtige Methoden

#### UserApi

##### CreateUserAsync:
Diese Methode dient dazu, einen neuen Benutzer in einem System zu erstellen. Sie nimmt als Parameter ein Datenübertragungsobjekt (userDto) entgegen, das die Benutzerdaten enthält. Zunächst wird der Master-Key des Benutzers verschlüsselt, bevor die Benutzerdaten mittels einer Post-Request an den Server gesendet werden.
Wenn der Server einen Erfolgstatus zurückgibt, wird der User über die erfolgreiche Erstellung informiert, ansonsten wird im mittgeteilt, dass der Benutzername bereits vergeben ist. 

``` csharp
        public async Task<UserModel> CreateUserAsync(UserDTO userDto)
        {
            userDto.masterKey = EncodeMasterKey(userDto.masterKey);

            HttpResponseMessage response = null;

            try
            {
                response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/create", userDto);
                response.EnsureSuccessStatusCode();
                

                MessageBox.Show("Benutzer erfolgreich erstellt! " + Char.ConvertFromUtf32(0x1F480));
            }
            catch (Exception ex)
            {
                MessageBox.Show("Username ist bereits vergeben!");

            }


            return null;
        }
```

##### AuthenticateUserAsync
Der User wird beim einloggen authentifiziert, indem er die Benutzerdaten an den Server sendet und die Antwort des Servers überprüft. Zuerst wird der Master-Key des Benutzers verschlüsselt. Dann wird eine HTTP POST-Anfrage an den Server gesendet, die die Benutzerdaten enthält.

Nachdem die Antwort des Servers empfangen wurde und ein erfolgreicher Statuscode zurückgegeben wurde, wird die Antwort des Servers gelesen und in ein UserModel-Objekt deserialisiert. Dieses UserModel-Objekt enthält die authentifizierten Benutzerdaten, die dann zurückgegeben werden. 


```csharp
        public async Task<UserModel> AuthenticateUserAsync(UserDTO userDto)
        {

            userDto.masterKey = EncodeMasterKey(userDto.masterKey);

            var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/users/authenticate", userDto);
            response.EnsureSuccessStatusCode();

            return JsonConvert.DeserializeObject<UserModel>(await response.Content.ReadAsStringAsync());
        }
```

##### GetUserById

Diese Methode ruft einen Benutzer anhand seiner ID vom Server ab. Dazu wird eine HTTP GET-Anfrage an den Server gesendet, wobei die Benutzer-ID als Teil der URL mitgeliefert wird. Als Antwort erhält der Client den gespeicherten User mit der selben ID wie in der Datenbank.

```csharp
        public async Task<UserModel> GetUserById(string id)
        {

            var response = await GetHttpClient().GetAsync(GetConnectionString() + ("/users/" + id));
            response.EnsureSuccessStatusCode();


            return await response.Content.ReadAsAsync<UserModel>();
        }
```


#### EntryApi

##### CreateEntry
Die Methode CreateEntry dient dazu, einen neuen Eintrag für einen Benutzer zu erstellen. Sie verschlüsselt die Eintragsdaten und sendet sie an den Server, um sie in der Datenbank zu speichern. Wenn die Erstellung nicht erfolgreich war, wird dies dem User mitgeteilt.

```csharp
        public async void CreateEntry(EntryDTO entryDto)
        {
            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();

                userDTO.username = user.username;
                userDTO.id = user.id;
                userDTO.masterKey = user.masterKey;

                userDTO.entries = user.entries;


                entryDto = Encryption.EncryptEntry(entryDto);

                UserApi userApi = UserApi.GetInstance();

                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/addEntry/" + user.id, entryDto);
                response.EnsureSuccessStatusCode();


                UserApi.user = await UserApi.GetInstance().GetUserById(UserApi.user.id);

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Creating/Editing Entry failed!");
            }
        }
```

##### EditEntry
Diese Methode folgt der seblen funktionsweise wie die Funktion CreateEntry. Der Hauptunterschied liegt darin, dass der Server mit den entgegengenommenen Daten keinen neuen Entry erstellt, sondern nach dem Entry mit jener ID sucht, und diesen aktualisiert.

```csharp
        public async void EditEntry(EntryDTO entryDto)
        {

            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();
                userDTO.id = user.id;

                entryDto = Encryption.EncryptEntry(entryDto);

                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/editEntry/" + userDTO.id, entryDto);
                response.EnsureSuccessStatusCode();


                UserApi.user = await UserApi.GetInstance().GetUserById(UserApi.user.id);

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Creating/Editing Entry failed!");
            }

        }
```

##### DeleteEntry

Die Methode DeleteEntry dient dazu, einen ausgewählten Eintrag eines Benutzers zu löschen. Sie sendet die Anfrage an den Server und entfernt anschließend den entsprechenden Eintrag aus der Liste.


```csharp
        public async void DeleteEntry(EntryModel selectedEntry)
        {
            try
            {
                UserModel user = UserApi.user;
                UserDTO userDTO = new UserDTO();

                userDTO.username = user.username;
                userDTO.id = user.id;
                userDTO.masterKey = user.masterKey;
                userDTO.entries = user.entries;


                var response = await GetHttpClient().PostAsJsonAsync(GetConnectionString() + "/entries/delete/" + selectedEntry.id, userDTO);
                response.EnsureSuccessStatusCode();

                int entryCount = user.entries.Count;

                for (int i = 0; entryCount == user.entries.Count; i++)
                {
                    if (user.entries[i].id == selectedEntry.id)
                    {
                        user.entries.RemoveAt(i);
                    }
                }

                UserApi.user = user;

                EntryCreated?.Invoke(this, user);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Deleting Entry failed!");
            }
        }
```

## <u>Web-Application</u>

### Einführung
Die Web-Anwendung des Passwortmanagers bietet Benutzern die Möglichkeit, von verschiedenen Plattformen aus auf ihre gespeicherten Passwörter zuzugreifen und sie zu verwalten.

### Technologien
Die Web-Anwendung wird mithilfe von `Node.js` entwickelt, was die  die Ausführung von JavaScript-Code auf dem Server ermöglicht und eine Vielzahl von Modulen und Tools anbietet, um die Entwicklung zu erleichtern. 


### Probleme
Die CORS-Einschränkung des Browsers kann dazu führen, dass Anfragen zwischen verschiedenen Ursprüngen blockiert werden. Ohne eine entsprechende Konfiguration funktioniert die Kommunikation zwischen dem Web-Client und dem Server nicht ordnungsgemäß.


### NodeJS Config

Um CORS-Probleme zu lösen, wird eine Middleware in der Node.js-Anwendung verwendet. Diese Middleware fügt den HTTP-Antworten die erforderlichen CORS-Header hinzu, um Anfragen von einem bestimmten Ursprung zu akzeptieren. In der Konfiguration wird festgelegt, von welchem Ursprung Anfragen akzeptiert werden sollen, welche Methoden erlaubt sind und welche Header verwendet werden dürfen.

```javascript
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

### SpringBoot Config
Auf der Serverseite wird ebenefalls eine CORS-Konfiguration vorgenommen. 

``` java
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3001")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

Zudem muss folgende Annotation für die Controller verwendet werden, um die Konfiguration der Klasse `CorsConfiguration`  anzuwenden.

``` java
@CrossOrigin(origins="http://localhost:3001")
```



## Diskussion der Ergebnisse

### Zusammenfassung
Der Passwortmanager ist eine plattformübergreifende Anwendung, die es Benutzern ermöglicht, ihre Zugangsdaten verschlüsselt zu speichern und zu verwalten. Die Anwendung besteht aus einem Server, der mit Spring Boot implementiert ist, sowie aus zwei Clients: einem WPF-Client und einem Web-Client. Der Server verwendet MongoDB als Datenbank und bietet RESTful Web Services für die Kommunikation mit den Clients. 

### Ausblick
#### Sicherheit und Verschlüsselung
Mögliche sinnvolle Ergänzungen um die Sicherheit der Nutzer zu gewährleisten wäre die Verschlüsselung auszubauen. Zum jetzigen Zeitpunkt erfolgt die Verschlüsselung ohne Initialisierungsvektor (IV), was dafür sorgt, dass der gleiche Input mit dem gleichen AES-Key der Encryption-Methode den selben Output produziert. Der IV würde dazu beitragen die Identifizierung von Mustern in den verschlüsselten Dateien zu erschweren.

Eine weitere Sicherheitsmaßnahme könnte darin bestehen, alle Zugriffe auf die API zu protokollieren und im Falle von Sicherheitsvorfällen zu durchforsten, bzw bereits frühzeitig zu erkennen. 

Ebenso auch die Implementierung der Zwei-Faktor-Authentifizierung um selbst im Falle einer Kompression des Masterkeys sicherzustellen, dass sich nur der autorisierte Nutzer anmelden kann, und Zugriff auf die sensiblen Daten erhält.

#### Passwortrichtlinien
Eine weitere Möglichkeit zur Stärkung der Sicherheit des Passwortmanagers besteht in der Implementierung einer automatischen Überprüfung der Passwortstärke. Durch die Festlegung von Richtlinien für die Erstellung von Passwörtern können Benutzer dazu motiviert werden, starke und einzigartige Passwörter zu wählen, die schwer zu erraten oder zu knacken sind. 

#### Autofill
Eine nützliche Erweiterung wäre die Implementierung einer Autofill-Funktion, die es ermöglicht, gespeicherte Zugangsdaten automatisch in Anmeldeformulare einzutragen. 