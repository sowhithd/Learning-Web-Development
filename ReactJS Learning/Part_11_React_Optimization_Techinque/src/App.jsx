import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(customCounter) {
    setChosenCount(customCounter);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        {/* 
           
           Key attribute Approach:
          Whenever the key value changes, so the chosen count state value changes.
            React will basically, you could say, throw away the old component instance.
            It will destroy it and recreate the component.
        
           Therefore this is a nice trick or pattern, to be precise, which you should use if you have some state
           that may change in parent component, that should then lead to some child component.
            
           UseEffect Approach:
            The Other approach is using "useEffect" in child component by reseting the state with "chosenCount" prop depedency
            But with this approach component also triggers/reexecutes an extra component execution.
            Because, after all, we learned that useEffect hook function runs after the component function execution.
            And if then change the state in component, trigger another component function execution. So, you have two 
            component function executions instead of one.
         
            */}
        <Counter  key ={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
