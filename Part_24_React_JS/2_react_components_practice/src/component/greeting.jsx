import React from "react";

function Greeting() {
  const date = new Date();
  const currentHour = date.getHours();

  let greeting;

  const customStyle = {
    color: "",
  };

  if (currentHour < 12) {
    greeting = "Good Morning";
    customStyle.color = "red";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
    customStyle.color = "green";
  } else {
    greeting = "Good Night";
    customStyle.color = "blue";
  }

  return (
    <div>
      <h1 className="heading" style={customStyle}>
        {greeting}
      </h1>
      <p> Current Hour: {currentHour}</p>
      <p></p>
    </div>
  );
}

export default Greeting;
