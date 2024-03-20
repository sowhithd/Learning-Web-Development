import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get('/posts',(req,res)=>{
  res.json(posts);
});
//CHALLENGE 2: GET a specific post by id
app.get('/posts/:id',(req,res)=>{
 const id = parseInt(req.params.id);
 const post = posts.find(p => p.id === id);
 if (!post) return res.status(404).json({ message: "Post not found" });
 res.json(post);
});
//CHALLENGE 3: POST a new post
app.post('/posts',(req,res)=>{
 
 //const newId = lastId += 1;
   //or
const newId = posts.length + 1;
  const postObj= {
    id: newId,
    title: req.body['title'],
    content: req.body['content'],
    author: req.body['author'],
   /* 
      generates datetime like this 2024-03-20T09:40:39.279Z
      toISOString() method on the Date object. This method converts the date object to a string 
      in the format "YYYY-MM-DDTHH:mm:ss.sssZ", where:
      YYYY: Four-digit year
      MM: Two-digit month (01-12)
      DD: Two-digit day (01-31)
      HH: Two-digit hours (00-23)
      mm: Two-digit minutes (00-59)
      ss: Two-digit seconds (00-59)
      .sss: Optional milliseconds (000-999)
       Z: Character 'Z' indicating Coordinated Universal Time (UTC)
    */
       date: new Date().toISOString() 
    }
    posts.push(postObj);
    lastId = newId;
    res.sendStatus(200);
});
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id',(req,res)=>{
  const id = parseInt(req.params.id);
  const existingpostObj = posts.find(p=>p.id === id);
  if (!existingpostObj) return res.status(404).json({ message: "Post not found" });
  const updatedpostObj = {
    id:id,
    title: req.body['title'] || existingpostObj.title,
    content: req.body['content'] || existingpostObj.content,
    author: req.body['author'] || existingpostObj.author,
    date: existingpostObj.date
  }
  const existingpostObjIndex = posts.findIndex(p=>p.id === id);
  posts[existingpostObjIndex] = updatedpostObj;
  res.sendStatus(200);
});
//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete('/posts/:id',(req,res)=>{
  const id = parseInt(req.params.id);
  const existingpostObjIndex = posts.findIndex(p=>p.id === id);

  if (existingpostObjIndex === -1) return res.status(404).json({ message: "Post not found" });

  if(existingpostObjIndex > -1){
    posts.splice(existingpostObjIndex,1);
    res.json({ message: "Post deleted" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
