# Passwortmanager

## Inhaltsverzeichnis
- [Passwortmanager](#passwortmanager)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Einführung](#einführung)
    - [Zweck des Passwortmanagers](#zweck-des-passwortmanagers)
    - [Bestandteile](#bestandteile)
    - [Funktionalitäten des Passwortmanagers](#funktionalitäten-des-passwortmanagers)
    - [Sicherheit und Verschlüsselung](#sicherheit-und-verschlüsselung)
    - [Technologien](#technologien)
  - [Server](#server)
    - [Spring-Boot](#spring-boot)
    - [API](#api)
      - [Routen](#routen)
        - [**UserController** (`/users`):](#usercontroller-users)
        - [**EntryController** (`/entries`):](#entrycontroller-entries)
    - [Datenbank](#datenbank)
      - [Benutzer (UserModel)](#benutzer-usermodel)
      - [Eintrag (EntryModel)](#eintrag-entrymodel)
  - [WPF-Application](#wpf-application)
  - [Web-Application](#web-application)


## <u>Einführung</u>
### Zweck des Passwortmanagers

Der Zweck des Passwortmanagers besteht darin, sensible Zugangsdaten wie Benutzernamen, Passwörter und andere vertrauliche Informationen sicher zu speichern und zu verwalten. Dies ermöglicht es Benutzern, sichere Passwörter zu generieren, ohne sich die Kennwörter merken zu müssen.

### Bestandteile

Das Projekt besteht aus folgenden Hauptkomponenten:

- **Server**: Die Backend-Komponente, die mithilfe von Spring Boot implementiert ist. Der Server ist verantwortlich für die Verarbeitung von Anfragen der Clients, die Datenbankinteraktion und die Bereitstellung von RESTful Web Services (CRUD).

- **WPF-Client**: Ein Desktop-Client, der in C# implementiert ist. Dieser Client bietet eine grafische Benutzeroberfläche für die Benutzer des Passwortmanagers. Mit dem WPF-Client können Benutzer ihre Passwortdaten verwalten und verschiedene Funktionen des Passwortmanagers nutzen.

- **Web-Client**: Ein webbasierte Client-Anwendung, die mithilfe von HTML, Java und CSS entwickelt ist. Der Web-Client bietet eine plattformübergreifende Benutzeroberfläche für den Zugriff auf den Passwortmanager über einen Webbrowser. Benutzer können sich über den Web-Client anmelden, ihre Passwortdaten anzeigen und verwalten sowie verschiedene Funktionen des Passwortmanagers nutzen.


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

- `/create`: Ein POST-Endpunkt, der verwendet wird, um einen neuen Benutzer in der DB zu speichern. Der Client sendet Benutzerdaten an diesen Endpunkt, und der Server erstellt dann den entsprechenden Benutzer in der DB.

- `/authenticate`: Ein POST-Endpunkt, der für die Benutzeranmeldung verwendet wird. Der Client sendet Anmeldeinformationen an diesen Endpunkt, und der Server überprüft die Gültigkeit dieser Informationen. Wenn die Anmeldeinformationen korrekt sind und in der DB enthalten sind, wird der Benutzer angemeldet und erhält Zugriff auf die Daten.

- `/{id}`: Ein GET-Endpunkt, der verwendet wird, um Benutzerdetails anhand der Benutzer-ID abzurufen. Der Client kann die Benutzer-ID als Teil der URL bereitstellen, und der Server gibt dann die Details des entsprechenden Benutzers zurück.

- `/{userId}/addEntry`: Ein POST-Endpunkt, der verwendet wird, um einen neuen Eintrag für einen bestimmten Benutzer hinzuzufügen. Der Client sendet Eintragsdaten an diesen Endpunkt, und der Server fügt dann den Eintrag zur Liste der Einträge des Benutzers hinzu.

- `/getUserByUsernameAndMasterKey`: Ein POST-Endpunkt, der verwendet wird, um einen Benutzer anhand seines Benutzernamens und seines Master-Passworts abzurufen. Der Client sendet Benutzerdaten an diesen Endpunkt, und der Server gibt den entsprechenden Benutzer zurück, falls vorhanden.

##### **EntryController** (`/entries`):

- `/delete/{id}`: Ein POST-Endpunkt, der verwendet wird, um einen Eintrag anhand seiner ID zu löschen. Der Client sendet die ID des zu löschenden Eintrags an diesen Endpunkt, und der Server löscht dann den Eintrag aus der DB.

- `/editEntry/{id}`: Ein POST-Endpunkt, der verwendet wird, um einen Eintrag anhand seiner ID zu bearbeiten. Der Client sendet aktualisierte Eintragsdaten an diesen Endpunkt, und der Server aktualisiert dann die entsprechenden Eintragsdetails in der DB.


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



## <u>WPF-Application</u>

## <u>Web-Application</u>

