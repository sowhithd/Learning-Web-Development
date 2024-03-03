import express from 'express';

const app = express();
const port = 3000;

//The port is the location of our server where we're going to be listening for requests from the client-side.

app.listen(port, () =>{
    console.log(`Server running on port ${port}.`);
});