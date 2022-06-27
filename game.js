// Initial Variables and Arrays
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarts = false;
var level = 0;
var pointerForChecking = 0;

/////////////// EVENT LISTENERS ////////////////
// Event listener to detect when a keyboard key has been pressed, and then the game starts
$(document).keydown(function () {
  if (gameStarts == false) {
    nextSequence();
    gameStarts = true;
  }
});

// Event listener attached to all buttons, waiting for the user to click one of them
// Inside the function, we can use the keyword this to refer to the object that triggered the click.
$(".btn").click(function () {
  if (gameStarts == true) {
    // First option:
    var userChosenColour = this.id; // With this we can get the id (color) of the object that triggered the event

    // Second option: We can use the attr() function in jQuery to find out the value of any of the attributes of an object:
    // var userChosenColour = $(this).attr("id");

    // Adding the color to the user secuence
    userClickedPattern.push(userChosenColour);

    // Playing the correspondig audio acording to the color (calling a function)
    playSound(userChosenColour);

    // Animating the pressed button (calling a function)
    animatePress(userChosenColour);

    // Checking if the user answer is correct
    checkAnswer(pointerForChecking);
  }
});

/////////////// FUNCTIONS ////////////////
// Function to create a random sequence for the game
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); // Creating a random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber]; // Choosing the color acordin to the number
  gamePattern.push(randomChosenColour); // Adding the color to the game secuence
  playSound(randomChosenColour); // Playing the correspondig audio acording to the color (calling a function)
  $("div#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100); // Animating the choosen (randomly) button (calling a function)
  level++;
  $("h1").text("Level " + level);
}

// Function to play the audio associated with the button pressed by the user
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to shadow the button pressed by the user
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed"); // Shadow

  // setTimeout() method
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed"); // Unshadow
  }, 100);
}

// Function to check if the user answer is correct
function checkAnswer(positionArray) {
  if (gamePattern[positionArray] == userClickedPattern[0]) {
    pointerForChecking++;
    userClickedPattern = [];

    // Checking if it is the last element of the sequence
    if (gamePattern.length == pointerForChecking) {
      pointerForChecking = 0;

      // setTimeout() method
      setTimeout(function () {
        nextSequence(); // Generating a new sequence because the user completed the whole last sequence
      }, 200);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    // setTimeout() method
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    // Calling a function to star over again
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  gameStarts = false;
  level = 0;
  pointerForChecking = 0;
}
