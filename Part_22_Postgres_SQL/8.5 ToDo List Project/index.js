import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"ToDoList",
  password:"meena",
  port:5432
}
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];


let items = [];

app.get("/",async (req, res) => {
  items = [];
  try {
    const result = await db.query("SELECT * FROM ActivityLists ORDER BY Id ASC;");
      items = result.rows;
     
      res.render("index.ejs", {
        listTitle: "Today",
        listItems: items,
      });
     
  } catch (error) {
    console.log(`Error in fetching data ${error.stack}`);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
     await db.query("INSERT INTO ActivityLists (taskname) VALUES ($1);", [item]);
     res.redirect("/");
    
  } catch (error) {
    console.log(`Error in inserting data ${error.stack}`);
  }
});

app.post("/edit", async (req, res) => {
 try {
   const result = await db.query("SELECT * FROM ActivityLists WHERE Id = $1",[req.body.updatedItemId]);

   if (result.rows.taskname !== req.body.updatedItemTitle) { 
      await db.query("UPDATE ActivityLists SET taskname = $1 WHERE Id = $2",[req.body.updatedItemTitle, req.body.updatedItemId]);
   }
   res.redirect("/");
 } catch (error) {
  console.log(`Error in upating data ${error.stack}`);
 }

});

app.post("/delete", async (req, res) => {
  try {
     await db.query("DELETE FROM ActivityLists WHERE Id = $1;",[req.body.deleteItemId]);
     res.redirect("/");
  } catch (error) {
    console.log(`Error in deleting data ${error.stack}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
