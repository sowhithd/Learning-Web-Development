/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

//Breakdown the tasks

//1.Use the inquirer npm package to get user input.

import inquirer from 'inquirer';
import  fs from 'fs';
import qr from 'qr-image';

const question = {
    type:'input',
    name:'URL',
    message:'Enter a URL which to be conveted  in QR Code: '
}
inquirer.prompt([question]).then((answer) =>{
    console.log(answer.URL);

  //  2. Use the qr-image npm package to turn the user entered URL into a QR code image.

  var qr_png = qr.image(answer.URL,[{type:'png'},{size:'10px'}]);
  qr_png.pipe(fs.createWriteStream('QRcode.png'));
   // 3. Create a txt file to save the user input using the native fs node module.
   fs.writeFile("User_Entered_URL.txt",answer.URL,(error)=>{
    if (error){
        throw error;
    }
    console.log('File has been saved');
   });
}).catch((error)=>{
    if(error.isTtyError){
      throw error
    }
    else{
        console.log(error);
    }
});