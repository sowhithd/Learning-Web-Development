//Written by me
/*

const numArr = [1,2,3,4,5,6];

var randomNumber1 = Math.floor(Math.random() * numArr.length);
var num1ArrValue = numArr[randomNumber1];
//console.log(randomNumber1);

var randomNumber2 = Math.floor(Math.random() * numArr.length);
var num2ArrValue = numArr[randomNumber2];

var img1 = document.querySelector(".img1");
//console.log(img1);
img1.src = './images/dice'+num1ArrValue+'.png';

var img2 = document.querySelector(".img2");
//console.log(img1);
img2.src = './images/dice'+num2ArrValue+'.png';

var h1ref =  document.querySelector('h1');

//console.log(h1ref.innerText);

if(num1ArrValue > num2ArrValue) {
    h1ref.innerText = 'Player1 Wins!';
}
else if(num1ArrValue < num2ArrValue) {
    h1ref.innerText = "Player2 Wins !";
}
else {
    h1ref.innerText = "It's a Draw!" ;
}

*/


// Course Solution

var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6

var randomDiceImage = "dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

var randomImageSource = "images/" + randomDiceImage; //images/dice1.png - images/dice6.png

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src", randomImageSource);


var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomImageSource2 = "images/dice" + randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);


//If player 1 wins
if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "&#128681 Play 1 Wins!"; //HTML Dec Code &#128681 for 🚩
}
else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player 2 Wins! &#128681";
}
else {
  document.querySelector("h1").innerHTML = "Draw!";
}
