import { useEffect } from "react";
import ProgressBar from "./ProgressBar";
const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  /*
   setTimeout method is sideEffect because it's not directly related to outputting this JSX code.
   
   Problem without using useEffect for setTimeout method:
   
   If we try to remove one of the selected places timer method gets executed and deletes the place. The problem arises If we
   click "No button" in dialog window still the place will get removed from selected places.
   
   Reason is the timer is never stopped when this component is not rendered anymore. Instead it was started and it keeps on going
   behind the scenes, independent from the question whether this component is currently visible or not. 
  ----------------------------------------------------------------------------------------
  Solution:
    We would not need this effect function because setting the timer wasn't the problem. But cleaning it up, getting rid of it,
    when this component function disappears.

    And you define such a cleanup function by returning it from inside the effect function. So, this effect function can return 
    another function which will then be executed by React right before this effect function runs again or, and that's the important 
    part here, right before this component dismounts. So, before it's removed from the DOM.

    It's also worth noting that this cleanup function does not run right before the effect function is executed for the first time.
    It's only executed before subsequent executions of this effect function or when this component is removed.
  
  */

  /*
   * In useEffect when adding functions as dependencies, there is a danger of creating an infinite loop.
   * Because this onConfirmed function is in the end defined in the app component in this case.
   * This OnConfirmed prop is set equal to this handleRemovePlace function in defined in App.jsx.
   * In JavaScript functions are just values specifically, they are objects.
   * handleRemovePlace function object in App.jsx is indeed recreated every time this App component function reexecutes. The below
     useEffect will gets executed again this creates an infinite loop.
    
   Reason for infinite loop is:
   * handleRemovePlace function in App.jsx is therefore also recreated.
   
   * JavaScript does not treat these two functions as equal even though they have the same code.
   
   * And since functions are objects in JavaScript, a new object is created. And as you might know in JavaScript when you create two 
     different objects even if they have the same shape or the same code as it's the case here with the function, even if that's the case, 
     the objects are not the same.
   
   * Therefore, because objects and also specifically functions are not treated as equal, this onConfirm dependency in below useEffect 
     will be different between component render cycles in this case every App.jsx render changes function objcet is different.
   
   * React takes a look at this new object which gets created internally on App component render cycle, it compares it to the old object
     of the function and determines that these two are different.
   
  * Therefore, React would go ahead and re-execute this component function even though technically, below dependency didn't change.
     And this can lead to create a infinite loop issue.
   
     
     This can be resolved using useCallBack hook which we can see that in App.jsx  
     
   
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);
    //Cleanup Function: This function runs before the effect function runs again and when the component unmounts.
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* 
        And now with that, it's not the entire delete confirmation component that will be re-executed every 10 milliseconds, but it's, 
        instead, inside of the progress bar component that this computation will take place.
        
        This is an optimization you might wanna consider to avoid unnecessary computations for ex: Moved the logic to a new component

      */}
      <ProgressBar Timer={TIMER} />
    </div>
  );
}
