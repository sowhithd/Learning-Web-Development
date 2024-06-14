//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'; 

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const password = 'ILoveProgramming';
let isUserAuthenticated = false;


function checkPassword(request,response,next){
    if(request.body["password"] === password) {
    //if(request.body.password === password){
        isUserAuthenticated = true;
    }
    next();
    
}

/*
 body-parser is now incorporated as a part of Express, so if you don't want to install yet another module, you don't want 
 to put in import body-parser, you can simply replace it with express because it now has all of the functionality of body-parser
 included because it's such a commonly needed functionality, but it does need to be added in as a middleware.
*/
app.use(express.urlencoded({extended:true}));
//app.use(bodyParser.urlencoded({extended:true}));

app.use(checkPassword);

app.get('/',(req,res)=>{
res.sendFile(`${__dirname}/public/index.html`);
});

app.post('/check',(req,res)=>{
    console.log(req.body);
if(isUserAuthenticated){
 res.sendFile(`${__dirname}/public/secret.html`)
}
else{
    res.sendFile(`${__dirname}/public/index.html`);
    //Alternatively res.redirect("/");
}
});

app.listen(port, () => {
    console.log(`server is listening at port: ${port}`);
});