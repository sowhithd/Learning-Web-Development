import React, { useState } from "react";

/*
But one of the rules for using hooks is that you must use a 
hook inside a functional component, so we have to create a 
function that renders a component and then inside that 
function, we can use hooks.

*/
function App() {
  const [count, setCount] = useState(0);

  function getCount(event) {
    const typeofCalcuation = event.target.innerHTML;
    if (typeofCalcuation === "+") {
      setCount(count + 1);
    } else if (typeofCalcuation === "-") {
      setCount(count - 1);
    }
  }
  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={getCount}>-</button>
      <button onClick={getCount}>+</button>
    </div>
  );
  return <div />;
}

export default App;
