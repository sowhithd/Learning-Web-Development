import React from "react";

var isDone = false;

function strike() {
  /*
  Imperative Programming approach:
  document.getElementById("root").style.textDecoration = "line-through";
  */

  /*
  * Declarative style of code where we were tracking that 
    variable "isDone", then instead of having to get the 
    element and update its properties, you can simply change
    isDone to true, or is done to false.
  
 * But even though you might think this code should 
   theoretically work, it doesn't.
 *  And the reason is because these elements are being 
    rendered, and they are not changeable. They have to be 
    re-rendered onto the screen in order for the changes 
    in their properties, such as their style property, 
    to be seen. And to do that

   we have to learn about something called Hooks
  */
  isDone = true;
}

function unStrike() {
  /*
  Imperative Programming approach:
  document.getElementById("root").style.textDecoration = "null";
  */
  isDone = false;
}

function App() {
  return (
    <div>
      <p style={isDone ? { textDecoration: "line-through" } : null}>Buy milk</p>
      <button onClick={strike}>Change to strike through</button>
      <button onClick={unStrike}>Change back</button>
    </div>
  );
}

export default App;
