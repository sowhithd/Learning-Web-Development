import express from 'express';

const app = new express();
const port = 3000;

app.get('/',(req,res)=>{
   // console.log(req.rawHeaders);
   res.send("<h2>Hello Welcom to My Home Page</h2>");
});

app.get('/about',(req,res)=>{
    res.send("<h1>Welcome To About Page</h1>");
});

app.get('/contact',(req,res)=>{
  res.send("<h2>If any queries please send email to: test@gmail.com</h2>");
});

app.listen(port,()=>{
    console.log(`Server is Listening at Port ${port}`);
});