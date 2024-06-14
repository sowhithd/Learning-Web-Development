import React, { useState } from "react";

/*
  An input form element whose value is controlled by React 
  in this way is called a “controlled component”.
  URL: https://legacy.reactjs.org/docs/forms.html#controlled-components

*/

function App() {
  const [isMouserOver, setIsMouseOver] = useState(false);
  const [headingText, setHeadingText] = useState("Hello, Welcome");
  const [name, setName] = useState("");
  function MouseOver() {
    //  console.log("MouseOver");
    setIsMouseOver(true);
  }

  function MouseOut() {
    //console.log("MouseOut");
    setIsMouseOver(false);
  }
  function handleChange(event) {
    setName(event.target.value);
  }

  function SubmitResponse(event) {
    //const enteredName = document.querySelector('input[type="text"]').value;
    //setHeadingText(`Hi ${enteredName} your name is submitted`);

    //OR

    /*
     And this is a method that basically prevents the 
     default next behavior of the event which in our case
     if it's coming from the form's onClick to here, 
     that is going to be refreshing the page which gets 
     stopped now.

    */

    setHeadingText(`Hi ${name} your name is submitted`);
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <form onSubmit={SubmitResponse}>
        <input
          type="text"
          placeholder="What's your name?"
          onChange={handleChange}
          value={name}
        />
        <button
          style={{ backgroundColor: isMouserOver ? "black" : "white" }}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
