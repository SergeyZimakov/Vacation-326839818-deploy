# Vacation-326839818

### 1. Creating a schema:

  a. Enter to "server" folder
  
  b. Enter to mysqlScripts.sql file  
  
  c. Copy all scripts from this file and run them in MySql Workbrench
  
  d. Set MySql settings:
- host: 'localhost',
- user: 'root',
- password: 'root'
### 2. Running the project:
  a. Open the project in VsCode

  b. Open the terminal
  
  c. Run following commands:
- $:npm install
- $:cd client
- $:npm install
- $:cd ../server
- $:npm install
- $:cd ..
- $:npm run prod
- (or $:npm run dev for development mode)
    
### 3. Admin's user:
- The project doesn`t include users. The first registered user will get the role of "Admin" and all follow users will get the role of "User".

###  4. Images:
The limits of uploaded images are:
- size: 1024 x 1024 px
- weight: 50 mb