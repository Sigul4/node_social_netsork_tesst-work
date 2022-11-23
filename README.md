Hi!
There is algorithm to up server
1) Init code from "./damp.sql" into console mysql2 or MySQL Workbench  
2) clean this stopper to init "insert script"
```
./index.js
                             👇
13 require("./autocreate.js")//(100, User, Following, sequelize)
```

3) run into console command "npm start"
4) send some rest request by next urls: 
"http://localhost:4000/not-following" 
"http://localhost:4000/max-following" 
"http://localhost:4000/users"
"http://localhost:4000/users/123/friends?order_by=user_id&order_type=desc"
*** I change field id in users table to user_id for better readability ***
