import { useState, memo, useCallback, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";
import CounterHistory from "./CounterHistory.jsx";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
/*
   * In React "memo" is a higher-order component (HOC) that helps optimize functional components by memoizing the result. 
     This means that React will skip rendering the component if its props have not changed, which can improve performance, 
     especially for components that render frequently or are computationally expensive to render.

     How memo Works: 
      When you wrap a component with memo, React performs a shallow comparison of the component's props. 
      If the props are the same as the previous render, React reuses the last rendered result and skips rendering 
      the component again. If the props are different, React re-renders the component.


   * What "memo" will do is that it will take a look at the props of your component function and whenever the component 
     function would normally execute again.

   * Memo only prevents function executions that are triggered by the parent component.
     If that internal state changes(meaning for ex: any state inside Counter component) that should definitely trigger the 
     component function. Memo will not prevent this meaning it won't hold component execution. 
     It does not care about internal changes.

     When to Use memo:
     * Pure Functional Components: Components that render the same output for the same props.
     * Performance Optimization: Components that are expensive to render or are rendered frequently.
     * Avoid Unnecessary Renders: When components receive unchanged props often.

    When Not to Use memo:
    * Small Components: For small, simple components, the overhead of memoization might not provide significant performance 
                        benefits.
    * Stateful Logic: Components that rely heavily on internal state or side effects might not benefit from memoization.
   
 */

const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  /*
    * useMemo is a hook that memoizes a value. It is useful for optimizing performance by preventing complex/expensive 
      calculations from being performed on every render. 
      
    * useMemo takes two arguments: a function that returns a value and a dependency array. The value will only be recalculated 
      when one of the dependencies changes.

    * Want to prevent the execution of normal functions that are called inside of component functions, unless their 
      input changed. And React gives us a hook that can be used for this scenario and problem, the useMemo hook.
    
    * useMemo should really only be used if you have a complex calculation that you want to prevent.
    
    * I wanna emphasize though that you really should not overuse useMemo. You should not start wrapping it around 
      all your functions, because just like Memo, of course it does need to perform this extra dependency value comparison.
  
  */
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );
  
  /*
    * state is scoped to a component. And if you use the same component function to create multiple component instances based on
      that function every instance has its own isolated state.
    
    * state is also tracked by position by React.

    * state does not just belong to this component type, but also to the position where this component is used. Meaning the 
      position in the component tree. React tracks state by component type and position(of that component) in the DOM tree.
      
      
  */
  
  //const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([{ value: initialCount, id: Math.random() * 100,mathOperation:'' }]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    //setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 100,mathOperation:'subtraction' },
      ...prevCounterChanges,
    ]);
  }, []); /*
            Would list all props or state or context values you would be using inside of this function because if one of 
            those values changed a new function would have to be created. so, that the latest value is used in that function.
            
            But here we are only using setCounter which is a state updating function. And those state updating functions are 
            guaranteed to never change by React, and therefore you don't need to add them to this dependencies array.
          */

  const handleIncrement = useCallback(function handleIncrement() {
    //setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [ { value: 1, id: Math.random() * 100, mathOperation:'addition' }, ...prevCounterChanges]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;
