import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

let countries = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "meena",
  post: 5432,
});

db.connect();

async function checkVisisted() {

  // await db.query("SELECT country_code FROM visited_countries", (err, res) => {
  //   countries = [];
  //   if (err) {
  //     console.log(`Error in fetching data ${err.stack}`);
  //   } else {
  //     res.rows.forEach((val) => {
  //       countries.push(val.country_code);
  //     });
  //   }
  //   //    db.end();

    //OR
    
    const result = await db.query("SELECT country_code FROM visited_countries");
      let countries = [];
      result.rows.forEach((country) => {
        countries.push(country.country_code);
      });
      console.log(result.rows);
    //db.end();
    
   return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.

  const countries = await checkVisisted();

  console.log("countries: ",countries);

  res.render("index.ejs", { countries: countries, total: countries.length,error:''});
});

app.post("/add", async (req, res) => {
  let  input = req.body["country"];
  input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name = $1",
      [input]
    );

    /*
    
     const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    */

    let data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
