# Derby Corner Store
Code Louisville Full-Stack JavaScript Final Project

## Instructions
This server-side application requires a certain environment in order to properly run.

### Software Requirements
#### General Software
Name | Type | Reason | Note
---- | ---- | ------ | ----
[Chrome](https://google.com/chrome/) | Web Browser | Needed to view the project's front end. | You may substitute any modern, standards compliant browser. Chrome is recommended.
Notepad/TextEdit | Text Editor | Needed to configure the project's .env file. | You may substitute any text editor capable of reading/writing the UTF-8 format.
#### Project Specific
Name | Type | Reason | Note
-------- | ---- | ------ | ----
[git](https://git-scm.com) | Software configuration management. | Used to download the project files. | You may alternatively download the files through your browser. These instructions assume you will use git.
[node.js](https://nodejs.org) | Standalone JavaScript runtime. | Used as the web server for the project. |
[MAMP](https://mamp.info) | Web development environment. | Provides the MySQL server used by the project. | You may provide your own MySQL server. These instructions assume you will use MAMP.
#### OS Specific
##### macOS
Name | Type | Reason | Note
---- | ---- | ------ | ----
[Homebrew](https://brew.sh/) | Package management. | Used to download other required software. | You may alternatively download and install the requirements through your web browser. These instructions assume you will use Homebrew.

### Windows Instructions
#### Download Requirements
1. Navigate to [https://git-scm.com/download/win](https://git-scm.com/download/win) and download the most appropriate version for your computer. Run the git installer and accept all default settings.
2. Navigate to [https://nodejs.org/](https://nodejs.org/en/download) and download the most current LTS version (12.16.3 or greater). Run the node.js installer and accept all default settings.
3. Navigate to [https://mamp.info/](https://mamp.info/en/downloads/) and download the most current free version (4.2.0 or greater). Run the MAMP installer and accept all default settings.
#### Configure Environment
If you are prompted by your system's network firewall to allow or deny traffic, be sure to **allow** traffic.
##### Start MAMP
4. Run MAMP using the desktop icon or the start menu. If the servers don't start automatically, click the "Start Servers" button. If the servers don't stay running choose the "Preferences" item from the "MAMP" dropdown. Change to the "PHP" tab and switch the "Standard Version" to "7.2.14" (this is a knwon bug with the free version of MAMP on Windows).
##### Download Project Files
5. Choose a folder you are comfortable running the project in. Open the folder in Explorer, right click inside it, and choose "Git Bash Here" to open a terminal.
6. Inside that terminal run `git clone https://github.com/aallehoff/derby-corner-store.git` . This will create a folder named derby-corner-store. Change into the directory by running `cd derby-corner-store` .
7. Inside the terminal, run `npm install` . This will download required node.js modules to allow the project to run.
##### Configure environment
9.  In MAMP, click the *Open WebStart page* button on the main screen. This will open a page with configuration information.
10.  Using your text editor, copy the *port*, *username*, and *password* from the MAMP WebStart page into the blank spots in the `.env.example` file in the root directory of the project. Save the file.
11.  Rename the `.env.example` file to `.env`. Using the terminal, the command is `mv .env.example .env` .
12. Back in the MAMP Webstart Page under the MySQL heading, click the *phpMyAdmin* link. Then click the *Databases* tab. Under the *Create database* header enter `derby-corner-store` into the *Database name* field. Leave the default encoding, and then hit the *Create* button.
#### Run the Server
13. Run `npm start` . This starts the server. You may now navigate to the location displayed in your console to see the project.

### macOS Instructions
#### Download Requirements
##### Install Homebrew
1. Navigate to [https://docs.brew.sh/Installation](https://docs.brew.sh/Installation) and follow the instructions there to install Homebrew.
##### Install other software
2. Open a terminal and run the following command: `brew install git node mamp`.
#### Configure Environment
If you are prompted by your system's network firewall to allow or deny traffic, be sure to **allow** traffic.
##### Start MAMP
1. Start MAMP by clicking the icon in your application drawer. If the servers don't start automatically, click the "Start Servers" button.
##### Download Project Files
4. In your terminal `cd` into a directory you are comfortable sacing the project to.
5. Inside that terminal run `git clone https://github.com/aallehoff/derby-corner-store.git` . This will create a folder named derby-corner-store. Change into the directory by running `cd derby-corner-store` .
6. Inside the terminal, run `npm install` . This will download required node.js modules to allow the project to run.
##### Configure environment
7.  In MAMP, click the *Open WebStart page* button on the main screen. This will open a page with configuration information.
8.  Using your text editor, copy the *port*, *username*, and *password* from the MAMP WebStart page into the blank spots in the `.env.example` file in the root directory of the project. Save the file.
9.  Rename the `.env.example` file to `.env`. Using the terminal, the command is `mv .env.example .env` .
10. Back in the MAMP Webstart Page under the MySQL heading, click the *phpMyAdmin* link. Then click the *Databases* tab. Under the *Create database* header enter `derby-corner-store` into the *Database name* field. Leave the default encoding, and then hit the *Create* button.
#### Run the Server
11. Run `npm start` . This starts the server. You may now navigate to the location displayed in your console to see the project.

## Self Evaluation
### Project requirements
- [X] __Server Side Application__
  - [X] Create a CRUD application that communicates with an external database.
  - [X] Create
  - [X] Read
  - [X] Update
  - [X] Delete
  - [X] Connect to a MySQL database.
- [ ] __Responsive layout__
   - [ ] Adapts and improves user experience per device.
- [ ] __Custom HTML__
    - [ ] Includes comments for major portions.
    - [x] (optional) Bootstrap or similar.
- [ ] __Custom CSS__
    - [ ] Includes comments for major portions.
    - [ ] Minimum 3 rules.
    - [x] Minimum 1 media query.
    - [x] Located in a seperate file; not inline.
- [x] __Custom JS__
    - [ ] Includes comments for major portions.
    - [x] Minimum 1 function.
    - [x] Located in a seperate file; not inline.
    - [x] (optional) jQuery or similar.
- [x] __Uploaded to GitHub__
    - [x] Includes README file.
- [x] __No asset swaps__
    - [x] Must not reuse other projects from the course.
- [x] __Interactivity__
    - [x] Responds to actions performed by the user.

### Discussion