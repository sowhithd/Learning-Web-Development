import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom';
/*  
    If we wanna pass a ref from one component to another component. so, that we can use it in that other component where we have to 
    use we need to addd a special function provided by React. Then function is forwardRef.

    As name implies "it forwards a ref from one component to another.so, that ref can then be used in that other component."

    Now to use this forwardRef function, you have to wrap it around your component function like below

    We have to restructure the code like below to make sure that forwardRef is wrapped around this function and the value returned 
    by that, which will also be a component but a component adjusted by React is stored in this constant and is still exported.

    when wrapping a component function with forwardRef, that component function will receive a second argument after this props argument.
    Keep in mind the first parameter here is this props parameter, which we are destructuring here but now this component function 
    will receive a second parameter, a ref parameter. And that's only the case because we wrapped this component function here 
    with forwardRef.    
*/

/*
    useImperativeHandle in React is used to customize the instance value that is exposed when using ref in functional components. 
    It allows you to control what values or methods a parent component can access and interact with on a child component. 
    This is particularly useful for exposing certain methods from the child component to the parent, like focusing an input or 
    triggering an animation, while keeping the implementation details encapsulated within the child component.

    "forwardRef" is used to forward the ref from the parent to the child.
    
    "useImperativeHandle" takes the ref and an object containing the methods or values you want to expose.
    
    Now useImperativeHandle needs two arguments and the first one must be this ref which you get from forwardRef. 
    So, useImperativeHandle is really meant to work together with forwardRef.
    
    And the second value must be a function that then returns an object which groups all the properties and methods that should be 
    exposed by this component to other components.
    
    ref (from parent): This is the reference that the parent component creates and passes to the child component. 
                      It allows the parent to access methods or properties defined in the child component.

    localRef (inside child): This is a reference created within the child component to refer to a specific DOM element (or other values). 
                         In this example, it refers to the dialog element.

    The child component uses forwardRef to receive the ref from the parent. 

    Inside the child component, useRef is used to create localRef, which refers to the actual DOM element (e.g., an input element).

    useImperativeHandle is used to bind methods to the ref received from the parent. These methods can manipulate 
    the localRef (the actual DOM element).
    
    By using both ref and localRef, the child component can expose specific methods to the parent, while still keeping a direct 
    reference to its own DOM elements.
*/

const ResultModal = forwardRef(function ResultModal(
  { remaningTime, targetTime, onReset },
  ref
) {
  const childDialogRef = useRef();

  const userLost = remaningTime <= 0;
  const formatToSecondsFromMilliSeconds = (remaningTime / 1000).toFixed(2);

  const playerScore = Math.round(
    (1 - remaningTime / (targetTime * 1000)) * 100
  );

  useImperativeHandle(ref, () => {
    return {
      open() {
        childDialogRef.current.showModal();
      },
    };
  });

  //export default  function ResultModal({dialogRef, result, targetTime }) {
  return createPortal(
    <dialog ref={childDialogRef} className="result-modal" onClose={onReset}>
      {/*Above added ref attribute is supported on all built-in components.
       we're  forwarding a ref that's defined in TimerChallenge, to this ref here to the dialog element in result modal.
    */}
      {/*<dialog className="result-modal" open> */}
      {/*Above built-in dialog element by default is invisible.  But it can be made visible by adding the open attribute to it.*/}
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score: {playerScore}</h2>}
      <p>
        The trget time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You Stopped the timer with{" "}
        <strong>{formatToSecondsFromMilliSeconds} seconds left.</strong>{" "}
      </p>
      {/*
            when we add attribute method to a form tag with value dialog which is something that's built into native HTML and 
            supported by modern browsers. 

            What is the use of it?
             * With the method set to dialog HTML, inside of a dialogue(here that is a root element), a button that submits the form
               like this close button, will close this dialogue without any extra JavaScript required.
        */}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
