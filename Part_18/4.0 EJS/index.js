import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

var __dirName = dirname(fileURLToPath(import.meta.url));


var app =  express();
var port = 3000;
var str = '';

function getDay(){
    var todayDate =  new Date();
    console.log(todayDate.getDay());

    if(todayDate.getDay() === 0 ||  todayDate.getDay() === 6){
        return str = "It's the weekend, it's time to have fun!";
    }
    else{
        return str = "It's a weekday, it's time to work hard!";
    }
    
}

app.get( '/', (req,res) => {
    getDay();
    res.render(
                `${__dirName}/views/index.ejs`,
                {customString:str}
              );
});


app.listen(port, ()=>{
console.log(`App is listening in port: ${port}`);
});