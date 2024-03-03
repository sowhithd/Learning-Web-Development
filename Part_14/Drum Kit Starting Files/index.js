/*
//var buttonsRef = document.getElementsByTagName("button");

        //or
var buttonsRef = document.querySelectorAll("button");



//console.log(buttonsRef);

for (let index = 0; index < buttonsRef.length; index++) {

    // Added function the way is called anonymous function call
   buttonsRef[index].addEventListener("click",function () { 
                                                           
    switch (this.innerHTML) {
        case 'w':
            var tom1 =  new Audio("./sounds/tom-1.mp3");
            tom1.play();
            break;
        case 'a':
            var tom2 =  new Audio("./sounds/tom-2.mp3");
            tom2.play();
            break;
        case 's':
            var tom3 =  new Audio("./sounds/tom-3.mp3");
            tom3.play();
            break;
        case 'd':
            var tom4 =  new Audio("./sounds/tom-4.mp3");
            tom4.play();
            break;
         case 'j':
            var snare =  new Audio("./sounds/snare.mp3");
            snare.play();
            break;    
        case 'k':
            var crash =  new Audio("./sounds/crash.mp3");
            crash.play();
            break;   
        case 'l':
            var kickbass =  new Audio("./sounds/kick-bass.mp3");
            kickbass.play();
            break;   
        default:
            console.log(this.innerHTML);
            break;
    }
      
  });

     // Added function the way is called named function call                                              
    buttonsRef[index].addEventListener("click", function() {
        btnClicked (this.innerHTML);
     });
}
*/

var buttonsRef = document.querySelectorAll("button");


//added eventlistener to button clicks
for (let index = 0; index < buttonsRef.length; index++) {

    buttonsRef[index].addEventListener("click", function() {
        makeSound (this.innerHTML);
        addAnimation (this.innerHTML);
     });
     
}

//added eventlistener to keyboard strokes
document.addEventListener("keypress",function(event) { 
    //event contains a property called key, which tells us which keyboard key was pressed.
    makeSound (event.key);
    addAnimation (event.key);
});

function makeSound(currentElement) {
      switch (currentElement) {
        case 'w':
            var tom1 =  new Audio("./sounds/tom-1.mp3");
            tom1.play();
            break;
        case 'a':
            var tom2 =  new Audio("./sounds/tom-2.mp3");
            tom2.play();
            break;
        case 's':
            var tom3 =  new Audio("./sounds/tom-3.mp3");
            tom3.play();
            break;
        case 'd':
            var tom4 =  new Audio("./sounds/tom-4.mp3");
            tom4.play();
            break;
         case 'j':
            var snare =  new Audio("./sounds/snare.mp3");
            snare.play();
            break;    
        case 'k':
            var crash =  new Audio("./sounds/crash.mp3");
            crash.play();
            break;   
        case 'l':
            var kickbass =  new Audio("./sounds/kick-bass.mp3");
            kickbass.play();
            break;   
        default:
            console.log(currentElement);
            break;
    }
}

function addAnimation (eventVal) {
 var elementRef = document.querySelector("."+eventVal);
 elementRef.classList.add('pressed');

 setTimeout(function(){
    elementRef.classList.remove('pressed');
 },100);
}