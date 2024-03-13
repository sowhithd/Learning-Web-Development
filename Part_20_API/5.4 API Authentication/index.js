import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "test3";
const yourPassword = "test3";
const yourAPIKey = "f51b720d-560c-4652-b4a8-a9878ae5302c";
const yourBearerToken = "aab30bfa-a3f0-42a0-9336-69ef92923489";

function stringifyRespons(data){
  return JSON.stringify(data);
}


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  console.log(`${API_URL}random`);
    axios.get(`${API_URL}random`)
    .then((response)=>{
      var  content = stringifyRespons(response.data);
      res.render('index.ejs',{content});
  })
  .catch((error)=>(console.log(error)));
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  axios.get(`${API_URL}all`,{
    auth:{
      username:yourUsername,
      password:yourPassword
    },
    params:{page:1}
  }).then((response)=>{
    var  content = stringifyRespons(response.data);
    res.render('index.ejs',{content});
  }).catch(err=>console.log(err));

});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  axios.get(`${API_URL}filter`,{
      params:{
        score:5,
        apiKey:yourAPIKey
      }
  }).then((response)=>{
    var  content = stringifyRespons(response.data);
    res.render('index.ejs',{content});
  }).catch(err=>console.log(err));
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 var val = 300;
  axios.get(`${API_URL}secrets/${val}`,{
    headers:{Authorization: `Bearer ${yourBearerToken}`}
  }).then((response)=>{
  var  content = stringifyRespons(response.data);
  res.render('index.ejs',{content});
}).catch((err)=>{
  console.log(err);
  res.status(404).send(err.message) //Reponse in UI: Request failed with status code 404
})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
