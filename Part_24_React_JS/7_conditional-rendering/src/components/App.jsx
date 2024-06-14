import React from "react";
import Form from "./Form";
/*
Challenge: Without moving the userIsRegistered variable,
1.Show Login as the button text if userIsRegistered 
  is true.
2.Show Register as the button text if userIsRegistered 
  is false.
3.Only show the Confirm Password input if userIsRegistered 
  is false. Don't show it if userIsRegistered is true.
*/
var isLoggedIN = false;
var userIsRegistered = false;
function App() {
  return (
    <div className="container">
      {isLoggedIN ? <h1>Hello</h1> : <Form userRegistered={userIsRegistered} />}
    </div>
  );
}

export default App;
