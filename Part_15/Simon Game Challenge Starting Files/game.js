var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var userLevel = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = randomNumber;

  var getrandomColor = buttonColours[randomChosenColour];

  gamePattern.push(getrandomColor);

//  console.log('gamePattern: '+gamePattern);

  $("#" + getrandomColor)
    .fadeOut(100)
    .fadeIn(100);

  // var audio =  new Audio("sounds/"+getrandomColor+".mp3");
  // audio.play();

  //or

  addSound(getrandomColor);
  userLevel++;

  if (userLevel > 0) {
    $("h1").text("Level " + userLevel);
  }
 // console.log("gamePattern: "+gamePattern);
}

function addSound(elementRef) {
  switch (elementRef) {
    case "red":
      var redSound = new Audio("./sounds/red.mp3");
      redSound.play();
      break;
    case "blue":
      var blueSound = new Audio("./sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio("./sounds/green.mp3");
      greenSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("./sounds/yellow.mp3");
      yellowSound.play();
      break;
      case "wrong":
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        break;
    default:
      console.log(elementRef);
      break;
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
    addSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    userLevel = 0;
    gamePattern = [];
}

function checkAnswer(currentLevel) {
    //console.log('gamePattern_checAnswer: '+gamePattern[currentLevel]);
    //console.log('userClickedPattern_checAnswer: '+userClickedPattern[currentLevel]);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       // console.log('success');
      // console.log('gamePattern_checAnswer_length: '+gamePattern.length);
    //console.log('userClickedPattern_checAnswer_length: '+userClickedPattern.length);
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern = [];
        }
    }
    else{
        startOver();
     }

}

/*
Issue: When we call method "nextSequence" directly like below the randon button got selected but not able to listen audio 
       after the animation completed.

RootCaue: It seems like the issue we have encountered related to browser restrictions on autoplaying audio. 
          Browsers often block autoplaying audio unless it's initiated by a user interaction like a click or a tap.

Solution: We can try a workaround by initiating the method call "nextSequence"  action in direct response to a user interaction
          say like button click event like added below.

*/
//nextSequence();

// $("#mainbtn").on("click", function () {
//   nextSequence();
// });

$(document).on("keypress", function () {
  if (userLevel === 0) {
    nextSequence();
  }
});

$('div[type="button"]').on("click", function (event) {
 // var userChosenColour = event.currentTarget.id;
 var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
 //console.log('userClickedPattern: '+userClickedPattern);
  animatePress(userChosenColour);
  addSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
