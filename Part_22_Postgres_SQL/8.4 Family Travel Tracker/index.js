import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "meena",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;
let AllVisitedCountriesDetails = [];
let users = [];
// let users = [
//   { id: 1, name: "Sowhith", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function getCountriesSearchInfo (searchterm) {
  console.log("SearchTerm: ",searchterm);
}



async function checkVisisted() {
  
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
  
 /*
  const result = await db.query("SELECT * FROM visited_countries");
  return result.rows;
  */
}

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users;
}

function getCountriesSelectedUserVisited(
  visitedCountriesInfo,
  selectedUser = 0,
  isOnLoad = false
) {
  let countries = [];
  if (isOnLoad) {
    visitedCountriesInfo = visitedCountriesInfo.filter(
      (country) => country.user_id === selectedUser
    );
    visitedCountriesInfo.forEach((country) => {
      countries.push(country.country_code);
    });
  } else {
    visitedCountriesInfo.rows.forEach((country) => {
      countries.push(country.country_code);
    });
  }
  return countries;
}


app.get("/", async (req, res) => {
  users = await getUsers();
  const countries = await checkVisisted();
  /*
  const dbResult = await checkVisisted();

  const countries = getCountriesSelectedUserVisited(
    dbResult,
    currentUserId,
    true
  );
  */

  const currentUserInfo = users.find((user) => user.id == currentUserId);
  
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUserInfo.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
console.log(req.body["country"]);
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) = $1;",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if(req.body["user"]){

    currentUserId = req.body.user;
    res.redirect("/");

    /*
    console.log("Form name user:", req.body["user"]);
  const result = await db.query(
    "SELECT vct.country_code,usr.color FROM users usr INNER JOIN visited_countries vct ON usr.id = vct.user_id WHERE usr.id = $1;",
    [req.body["user"]]
  );

  const countries = getCountriesSelectedUserVisited(result);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: result.rows[0].color,
  });
  */
 }
 else {
  //console.log("Form name add:", req.body["add"]); //value is new
  res.render("new.ejs");
 }
});

app.post("/new", async (req, res) => {
   // console.log("User Name: ",req.body.name);
  // console.log("User Selected Color: ",req.body.color);

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const result = await db.query(
    "INSERT INTO users (username, color) VALUES($1, $2) RETURNING *;",
    [req.body.name, req.body.color]
  );
  currentUserId = result.rows[0].id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
