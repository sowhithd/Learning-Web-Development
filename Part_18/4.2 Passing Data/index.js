import express from "express";
import bodyParser from "body-parser";
import {dirname} from 'path';
import { fileURLToPath } from "url";

var __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var headingtext ="";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //console.log(1);
  headingtext = "Enter Your name below";
  res.render(`${__dirname}/views/index.ejs`);
});

app.post("/submit", (req, res) => {
  //console.log(2);
  var fullNameLength;

  if(req.body['fName'])
     fullNameLength = req.body['fName'].length;
  if(req.body['lName'])
    fullNameLength += req.body['lName'].length;

    headingtext = `There are ${fullNameLength} letters in your name`;
    
    res.render(`${__dirname}/views/index.ejs`,{numberOfLetters:fullNameLength});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
