# CEPR 610 Final Project: "Derby Corner Store"
Code Louisville @ BU: Full-Stack Javascript

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
4. Run MAMP using the desktop icon or the start menu. If the servers don't start automatically, click the "Start Servers" button. If the servers don't stay running choose the "Preferences" item from the "MAMP" dropdown. Change to the "PHP" tab and switch the "Standard Version" to "7.2.14" (this is a known bug with the free version of MAMP on Windows).
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
- [X] __Responsive layout__
   - [X] Adapts and improves user experience per device.
- [X] __Custom HTML__
    - [X] Includes comments for major portions.
    - [x] (optional) Bootstrap or similar.
      - [X] Bootstrap
      - [X] Vue.js
- [X] __Custom CSS__
    - [X] Includes comments for major portions.
    - [X] Minimum 3 rules.
    - [x] Minimum 1 media query.
    - [x] Located in a seperate file; not inline.
- [x] __Custom JS__
    - [X] Includes comments for major portions.
    - [x] Minimum 1 function.
    - [x] Located in a seperate file; not inline.
    - [x] (optional) jQuery or similar.
      - [X] Express.js
      - [X] Sequelize
- [x] __Uploaded to GitHub__
    - [x] Includes README file.
- [x] __No asset swaps__
    - [x] Must not reuse other projects from the course.
- [x] __Interactivity__
    - [x] Responds to actions performed by the user.

### Testing
This project has been tested and confirmed to run on the following:

- Operating Systems
  - Windows
  - macOS
- Browsers
  - Chrome
  - Firefox

Mobile emulation was used to test the webclient's performance on small screens.

### Discussion

#### Concept
I designed the app as if I were creating a solution for a client. I decided to create a fictional convenience store, which I named *Derby Corner Store*, to use as the client.

Their requirements were as follows:
- Single page web app, CRUD capable.
- One database entry per UPC.
- Store manufacturer, description, quantity, and price for each UPC.
- Maximum quantity of 999 units, maximum price of $999.99.

#### Composition
The app is designed following the MVC pattern.
 Section | Components
----- | -----
Model | MySQL, Sequelize
View | Vue.js, Bootstrap
Controller | Node.js, Express.js

##### Features of the Model
The external database is MySQL as provided by MAMP. Sequelize is used to configure tables and query the database.

Only one table (named *items*) is used to store the item information for the app. There are 8 columns in use, 5 of which are relevant to this discussion:

1. upc
2. productMfg
3. productName
4. quantityOnHand
5. price

The *upc* is not a primary key, but is a unique value. This prevents duplicate entries. The *productName* is used as the item's description.

A JSON file is used to provide seed data at startup.

##### Features of the View
Vue.js is used to provide a single-page app. Bootstrap is used to aid styling, although a significant amount of styling is handled in raw CSS. In particular, for this project I preferred to manually configure flexbox behavior rather than rely on Bootstrap's flex features.

The Vue portion is made up of two components and one mixin:
1. client (component)
2. item-listing (component)
3. validation (mixin)

The *client* component handles single-item create, and multi-item read operations. It is the root component, and a parent to *item-listing*.

The *item-listing* component handles single-item read, update, and delete operations. It is a child of *client*.

Both of the above components import the *validation* mixin which contains methods used for client-side validation of user input. Of particular importance to this application is UPC validation.

Error messages produced by client-side validation are designed to be as user-friendly as conceivable possible. The client may also receive errors forwarded from the controller if appropriate.

##### Features of the Controller
Node.js and Express.js are used to create the server portion of this application.

The controller does **not** trust input from the Client. Further validation is performed to ensure the database does not receive malformed input.

Errors are gracefully handled and forwarded to the client in a way that they can be presented to the user when appropriate.

#### Future Work
A more advanced inventory control system would track significantly more points of data, possibly across multiple tables.

It would be interesting to compare MySQL performance to another database (such as MongoDB) and see what challenges porting the app to the new database would create.