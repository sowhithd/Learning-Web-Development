//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";
var currentHour = new Date().getHours();
var messageGreetings = "Good morning";
var currentColor = "";
if (currentHour < 12) {
  messageGreetings = "Good morning";
  currentColor = "greeting-morning";
} else if (currentHour < 18) {
  messageGreetings = "Good afternoon";
  currentColor = "greeting-afternoon";
} else {
  messageGreetings = "Good evening";
  currentColor = "greeting-night";
}
ReactDOM.render(
  <div>
    <h1 className={currentColor}>{messageGreetings}</h1>
    <p>Current Hour: {currentHour}</p>
  </div>,
  document.getElementById("root")
);
