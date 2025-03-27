/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };
  // Game Item Objects
  var walker = {
    xPos: 0,
    yPos: 0,
    xSpd: 0,
    ySpd: 0,
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.xSpd = -5
    }
    if (event.which === KEY.UP) {
      walker.ySpd = -5
    }
    if (event.which === KEY.RIGHT) {
      walker.xSpd = 5
    }
    if (event.which === KEY.DOWN) {
      walker.ySpd = 5
    }
    console.log(event.key);
  }
  
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.UP || event.which === KEY.RIGHT || event.which === KEY.DOWN) {
      walker.xSpd = 0;
      walker.ySpd = 0;
    }
    }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.xPos = walker.xPos + walker.xSpd;
    walker.yPos = walker.yPos + walker.ySpd;
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.xPos);
    $("#walker").css("top", walker.yPos);
  }

  function wallCollision() {
    var bWidth = $("#board").width() - 50;
    var bHeight = $("#board").height() - 50;
    if (walker.xPos < 0) {
      walker.xPos = 0;
      }
      if (walker.xPos > bWidth) {
      walker.xPos = bWidth;
      }
      if (walker.yPos < 0) {
      walker.yPos = 0;
      }
      if (walker.yPos > bHeight) {
      walker.yPos = bHeight;
      }
  }



  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
