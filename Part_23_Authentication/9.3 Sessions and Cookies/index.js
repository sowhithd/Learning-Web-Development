import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "meena",
  port: 5432,
});
db.connect();

/*
  * This is going to allow us to set up a new session to start saving user login sessions.
 
  * The secret in below object that's used to sign the session cookie. And this is the secret that's 
    used to sign the session cookie.
 
  * maxAge and this specifies a number in milliseconds to use when calculating the expiry.  
 
  * If we start out with 1000 milliseconds as one second, and then we times it by 60 to get 
    one minute, and then we times it by 60 to get one hour, and then maybe we times it by 24 
    to get one day, then we end up with a one-day length cookie. (1000 * 60 * 60 * 24)
*/
app.use(session({
  secret: "loginsecret",
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24
  }
}));


/*
  * And it's really important that your passport module goes after your session initialization.

  * You should have already created your session before you use the next lines of code.

  * This is really important. If you get the order wrong in our middleware because we know it 
    gets run from top to bottom.
*/


app.use(passport.initialize());
//This has to happen after we already have a session that's already ongoing, otherwise it's not going to work.
app.use(passport.session());


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});


app.get("/register", (req, res) => {
  res.render("register.ejs");
});


app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get('/secrets',(req, res)=>{

  //This is getting called from verify middle ware
  console.log("User Credentials in secrets route:", req.user); 

  /*
  How do we know if user are already logged in? Well, if we have an active session that's saved in 
  a cookie, then we can straight away show them that secrets page, but if we don't, then we shouldn't 
  show it to them
  */
  if(req.isAuthenticated()){
  res.render("secrets.ejs");  
  }
  else{
    res.redirect("/login");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          /*
            What we're going to change here is instead of simply just inserting the user and 
            not caring about the results, we're going to change this to say, 
            INSERT INTO the user the new email and password, but we're also going to use that 
            RETURNING SQL command in order to return everything that we get back from the record 
            that we just inserted.
          */
         const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          /*
            We're going to use req.login which comes from Passport, and remember it is 
            this particular casing "login", which is in lowercase. This is Important

            And once we've called req.login(), this automatically authenticates our user, 
            passes this user's information into the session, serializes, deserializes,
            and when we redirect to secrets route, we'll still be able to log in that user. 
          */
          req.login(user,(err)=>{
            console.log(err);
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/*
  passport as middleware and method authenticate() will trigger the strategy method written below
  as long as we tell it to. So we're going to say to use the local strategy in order 
  to authenticate this particular request.
*/
app.post("/login", passport.authenticate("local",{
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

/*
 * There's one thing that we need to remember about Passport.

 * It can automatically through the use of this verify() function, grab hold of the 
  username and password from the form that submits by user in login request.

 * So if we look in login.ejs file, you'll see that there is a field called username and a 
   field called password, and as long as that matches in method parameters we have username 
   and password and also username and password in the name attribute here, then 
   what it's going to do is it's going to automatically grab it. 

*/

//passport.use(new Strategy(async function verify(username,password,cb) {
passport.use(new Strategy(async function verify(username,password,callBackFunction) {
  console.log("user Credentials: ",{username,password});

  try {
    /*
      One of the important things to realize about how Passport works is it gets triggered 
      whenever we try to authenticate a user.

      So it falls into this verify() function, and the first thing we try to do as we did 
      before is we're going to see if we have a user with the current email like below.
    */

    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
         // console.error("Error comparing passwords:", err);
         return callBackFunction(err);
        } else {
          if (result) {
              return callBackFunction(null,user)
          } else {
            return callBackFunction(null,false);
           // res.send("Incorrect Password");
          }
        }
      });
    } else {
      return callBackFunction("User not found");
      //res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
}));

passport.serializeUser((user,cb)=>{
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  cb(null,user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
