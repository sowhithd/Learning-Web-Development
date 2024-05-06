import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "meena",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query("SELECT  * FROM users WHERE email = $1;", [
      username,
    ]);
    if (result.rows.length !== 0) {
      await db.query("INSERT INTO users(email,password) VALUES ($1, $2);", [
        username,
        password,
      ]);
      res.redirect("/login");
    } else {
      //res.send("Email Already Exists, Try logging in.");
      console.log("Email Already Exists, Try logging in.");
    }
  } catch (error) {
    console.log("Error while inserting the record ", error);
  }

  //console.log("Register UserName: ",username);
  //console.log("Register Password: ",password);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query(
      "SELECT  * FROM users WHERE email = $1  AND password  = $2;",
      [username, password]
    );

    if (result.rows.length !== 0) {
      res.render("secrets.ejs");
    } else {
      res.redirect("/login");
    }

    //console.log("Login UserName: ",username);
    //console.log("Login Password: ",password);
  } catch (error) {
    console.log("Error while fetching the record ", error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
