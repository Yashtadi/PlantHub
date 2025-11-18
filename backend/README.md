Backend Environment setup:
1. "mkdir backend" -> "cd backend" -> "npm init -y"

2. Install dependancies:
   "npm install express mongoose dotenv bcryptjs jsonwebtoken cors morgan express-validator nodemailer multer"

3. "npm install --save-dev nodemon"

4. update the package.json
    -change main to server.js;
    -add line; "type":"module"
    -add following in scripts:
        "start": "node server.js",
        "dev": "nodemon server.js"

5. create a .env file in the backend folder and paste the boiler plate code(later you can change the connection string)
    Boiler plate code:
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string_here
    JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
    JWT_EXPIRE=7d
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    NODE_ENV=development

6. Now we will write the code to make the MongoDB connection which will be written in: 
   backend/config/db.js

7. Now we will create some models for our website. The first one is User 
   NOTE: by convention the files inside the models folder , first letter we keep capital

8. backend/models/User.js
   Now each model has two parts:
   - model schema
   - and the model itself based off of the schema
   checkout the code in User.js

9. Now when we create the user model , it has a field called the password. Now saving the passwords of so many users as it is in the database is risky.
   So to encrypt the password we make use of the bycrypt module which has functions like .gensalt()
   what the gensalt function does is , it basically generates a random string, now we can store this string in a salt variable and hash it with the users password and then save it in our database , so the hacker can never be able to identify what the actual password is
   For this hashing also bycrypt module has a built in function - .hash()

   Not just this we also need to make sure that we do this hashing only when either the user is editing the password or reseting the password, not when user is changing email or something , that is why we use a block to check if passworrd is being modified , if not then we call the next() function which skips the hashing part of the code.

   # Now the question is how do we know the next time user enters a password , if it is right or wrong?
   Here comes the magic of bycrypt , when the user enters the password we can use .compare() function of the bycrypt module which handles this.
   # But how does it handle it ? Does it decrypt the password in the database and compare it to the entered password?
   No what .compare() function of the bycrypt module does is that it adds the same salt to the entered password and then compares both the strings to check if they are equal

10. Similarly I have created the following models:
    -Plant
    -Order

11. Added a few more files but i am yet to understand them , will add info about them here once i do understand them 

12. now i am adding backend controllers

# What are controllers?
Okay so controllers are basically functions or blocks of codes which are imported in the routes folder and used there to write code for routes.

# Now what are routes?
Routes are basically a code block which deals with a client server interaction, so in the routes folder there will be different routes which will use controllers , whose codes will be in the controller folder. Read the codes of the Routes and controller folders for better understanding.

# Wait there is more:
These routes are again used in another folder called "server.js" , we will understand this further. But server.js is the folder where we setup our backend server, how it starts , what response it gives to which request. So there are something called API's and the most famous one is the RESTFUL API which uses the HTTP methods(GET , POST , PUT , DELETE). 

So now when a user clicks on a plant and wants to see its information, it is a GET request which comes to the server , the server uses routes imported from the routes folder to handle these request , performs operations/interacts with the datbase using controllers inside that particular route and then the route gives a response.
We will see more about this later.

# Server.js
Now I wrote the server.js , the most important part of the backend
Here we will use the routes and controllers we set up earlier, and after coding this file , we can start our backend server

I have completed setting up some of the initial routes/apis and setting up the overall backend and now i can start working on the backend.

NOTE:
I just have to understand the code of utils and middlewate folder mainly
As for the routes and controllers folder , i have a basic idea of what it does but i still need to take a look of how the syntax is actually working.

At this juncture you can cd into the backend folder and run the backend using "npm run dev" and you will be connected to MongoDB

Now further on you can read the README in the frontend folder and i will document the next steps there

After you are done with frontend we need to do two more things , add plant data and images , so we will create a file seedPlants.js to seed plant data.
Also we will create a uploads folder where we will add images of the plants later
