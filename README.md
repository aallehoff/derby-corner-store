# bucl_fs_final_project
Code Louisville Full-Stack JavaScript Final Project

## Instructions
This server-side application requires a certain environment in order to properly run. Once all requirements are downloaded no further connection to the internet is required; it has been designed to be self containing.

### Software Requirements
Name | Type | Reason | Note
-------- | ---- | ------ | ----
[git](https://git-scm.com) | Software configuration management. | Used to download the project files. | You may alternatively download the files through your browser. These instructions assume you will use git.
[node.js](https://nodejs.org) | Standalone JavaScript runtime. | Used as the web server for the project. |
[MAMP](https://mamp.info) | Web development environment. | Provides the MySQL server used by the project. | You may provide your own MySQL server. These instructions assume you will use MAMP.

### Windows Instructions
#### Download Requirements
1. Navigate to [https://git-scm.com/download/win](https://git-scm.com/download/win) and download the most appropriate version for your computer. Run the git installer and accept all default settings.
2. Navigate to [https://nodejs.org/](https://nodejs.org/en/download) and download the most current LTS version (12.16.3 or greater). Run the node.js installer and accept all default settings.
3. Navigate to [https://mamp.info/](https://mamp.info/en/downloads/) and download the most current free version (4.2.0 or greater). Run the MAMP installer and accept all default settings.
#### Configure Environment
4. Run MAMP using the desktop icon or the start menu. If the servers don't start automatically, click the "Start Servers" button. if the servers don't stay running choose the "Preferences" item from the "MAMP" dropdown. Change to the "PHP" tab and switch the "Standard Version" to "7.2.14" (this is a knwon bug with the free version of MAMP on Windows).
5. Choose a folder you are comfortable running the project in. Open the folder in Explorer, right click inside it, and choose "Git Bash Here" to open a terminal.
6. Inside that terminal run `git clone https://github.com/aallehoff/derby-corner-store.git` . This will create a folder named derby-corner-store. Change into the directory by running `cd derby-corner-store` .
7. Inside the terminal, run `npm install` . This will download required node.js modules to allow the project to run.
8. Open the `.env.example` file. Change the defaults to fit your computer, if necessary.
9. Rename the `.env.example` file to `.env`. Using the terminal, the command is `mv .env.example .env` .
10. Run `npm start` . This starts the server. You may now navigate to the location displayed in your console to see the project.
