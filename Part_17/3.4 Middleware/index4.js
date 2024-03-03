//Imports the express library, providing functionality for building web applications in Node.js.
import express from "express";
//Imports the dirname function from the path module, used to extract the directory name from a path.
import {dirname} from "path";
//Imports the fileURLToPath function from the url module, used to convert a file URL to a file path (important in Node.js environments using ES modules).
import { fileURLToPath } from "url";
/*
Creates a constant named __dirname that stores the directory path of the current module, enabling access to files within 
the project directory.

In JavaScript, import.meta.url is a meta-property that provides access to the URL of the current module. 
It's a valuable feature when working with modules, particularly in environments like Node.js or when using module bundlers 
like Webpack.

Availability:
* import.meta.url is only available within JavaScript modules. This means it cannot be used in scripts that haven't 
  been loaded as modules.
* It's specifically designed for modern JavaScript environments that support modules natively, such as Node.js 
  with --experimental-modules flag or newer versions, and browsers that support ES modules (check browser compatibility for details).

Typically provides the absolute URL of the module, including the protocol (e.g., http://) and hostname if applicable. 
However, in some dynamic environments like bundlers, it might return a relative URL depending on the configuration.

*/
const __dirname = dirname(fileURLToPath(import.meta.url));

//Imports the body-parser middleware from the body-parser library, enabling parsing of request bodies from HTML forms for POST requests.
import bodyParser from "body-parser";


//console.log(__dirname);
const app = express();
const port = 3000;
var bandName ="";

/*
Remember: The order of middleware added here should be this order because first without parsing the incoming request
           we can't use body property of request method. 
          So, if want to get data from form body of HTML tag need to do bodyparser first 
*/


/*
Registers the bodyParser.urlencoded middleware as global middleware, meaning it will be applied to all incoming requests. 

This middleware parses incoming request bodies encoded in the application/x-www-form-urlencoded format (commonly used in HTML forms)
and makes the parsed data accessible on the req.body object. 

The middleware parses all json and urlencoded request bodies in an incoming request stream with the 'application/json' or 'application/x

This middleware should be placed immediately after the json and urlencoded parsers, or after any other 
parsing middleware (such as multipart) but before any routes that will parse the body.

The extended: true option ensures proper parsing of nested objects and arrays in the form data.
*/


app.use(bodyParser.urlencoded({extended : true}));

//Custom MiddleWare
function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator);

app.get("/",(req,res)=>{
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post('/submit',(req,res)=>{
console.log(req.body);
//res.send(`<h1>Your Band Name is:</h1><h2>${req.body.street}${req.body.pet}✌️<h2>`);
res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
