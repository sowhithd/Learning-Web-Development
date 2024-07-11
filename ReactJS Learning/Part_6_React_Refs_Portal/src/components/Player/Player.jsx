import { useState,useRef } from "react";

export default function Player() {
 /*
  //Handling input change and click event using UseState Hook

  const [enteredPlayerName, setEnteredPlayerName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    setIsSubmitted(false);
    setEnteredPlayerName(event.target.value);
  }

  function handleClick() {
    setIsSubmitted(true);
  }
  return (
    <section id="player">
      <h2>Welcome {isSubmitted ? enteredPlayerName: 'unknown entity'}</h2>
      <p>
        <input type="text" value={enteredPlayerName} onChange={handleChange} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
  */

  //////////////////////////////////Handling input change and subumit using useRef hook///////////////////////////////////////
 
  const [enteredPlayerName, setEnteredPlayerName] = useState();
  const playerName = useRef();

  /*
   For one  thing you will probably  do the most with refs is that you can connect them to JSX elements.
   And you can do that with a special prop that's supported by all React Components automatically out of the box, 
   and that's called "ref". And it's a prop that you can pass to any component, which just like the key prop for list items.
  */
  
  /* 
    As below we have added the "playerName" varaible to input HTML element. Now the input element is connected to ref varaible
    and we can access the input element using the ref varaible.
  */

    function handleClick() {
     /* 
      When the button to access the underlying connected element using playerName variable. How we were able to access 
      properties&methods of the input element, that is because because playerName variable is connected to it through the ref prop

      So this ref value you are getting back from useRef will always, really always be a JavaScript object that will always have a 
      current property. And that current property will always be the underlying element that you connected to it. We will have access
      to all properties and the methods. In this case we have access to input element properties & methods.
     */ 

      setEnteredPlayerName(playerName.current.value);
      playerName.current.value = '';
    }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'} </h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );

}
