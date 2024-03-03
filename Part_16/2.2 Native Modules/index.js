const fileSystem = require("node:fs");

//Create a new file in the current directory called "newFile.txt"
fileSystem.writeFile("message.txt","Hello from NodeJs \n Hello From Sowhith",(error)=>{
    if (error) {
        throw error;
    }
    console.log("File Saved Successfully");
});

//Read the file content and print in console.log
fileSystem.readFile("message.txt","utf8",(error,data)=>{
  if(error){
    throw error;
  }
  console.log(data);
});

//To remove the file
// fileSystem.unlink( "message.txt", (err) =>{
//     if(err){
//         throw err;
//     }
//     console.log("File Deleted Successfully");
// });

