import { useState, useRef } from "react";
import ResultModal from "../ResultModal/ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  /*
    useRef hook is not only just to connect to HTML elements,e ven though that is a very common use case
    But you can also use refs to manage any kind of value.

    For example when we can create a new ref to store the timer because in this current property, we'll store this pointer
    at this timer 

    This is defined inside of the component function, it will be component instance specific.
    
    Every component instance of this TimerChallenge component will get its own timer ref that works totally independent
    from the other refs that belong to the other instances of that component.

    "ref will not be reset or cleared when this component re-executes. Instead, just as with state values.
     React will store these timer values behind the scenes and make sure that they don't get lost
     as this component function re-executes."

     And that's therefore another use case for refs if you have a value that must be managed but that isn't really a state
     because that timer itself has no direct impact on the UI. We only care about whether a timer was started, and without 
     any impact in UI we can stop the timer.
  
  */
  const timer = useRef();
  const dialogRef = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaning, setTimeRemaning] = useState(targetTime * 1000); //milliseconds conversion
  const timerIsActive = timeRemaning > 0 && timeRemaning < targetTime * 1000;

  /*
    To stop timer manually if it expired, not just if the stop button was pressed. Because if it is equal to zero or smaller, we know 
    that time's up, that there is no time left.
    But set interval won't stop on its own
    
    Because it has no end date, so to say, it just keeps on firing every 10 milliseconds. So we also have to clear the setInterval 
    so this interval which we had set do not keep executing
  */
  if (timeRemaning <= 0) {
    clearInterval(timer.current);
    dialogRef.current.open();
  }
  function handlereset() {
    setTimeRemaning(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      /*
        we need to measure how much time is left on an ongoing basis so that we know exactly how much time is left when the timer is 
        being stopped. And setTimeout doesn't give us that information.
        
        Therefore, instead, we need setInterval, which is another function built into JavaScript.
        
        setInterval offers different functionality, because it will execute the code that present inside paranthesis  every time 
        the time here expired, so not just once like setTimeout.

        Instead of keeping targetTime as second parameter, we need to keep a short duration that we can ue  to keep track of how 
        much time expired.

        Below it is executed every 10 milliseconds, we should update the remaining time by calling setTimeRemaining and deduct 
        10 milliseconds from the current time remaining.
      
        */
      setTimeRemaning((previousTimeRemaning) => previousTimeRemaning - 10);
    }, 10); // milliseconds

    //timer.current = setTimeout(() => {
    //setTimerExpired(true);
    /*
        Because the built-in dialog element has such a showModal method, which you can call to show it.
        Because we are aware, inbuilt dialog element it is basically invisible out of the box but that changes 
        if you call this showModal method.
      */
    // dialogRef.current.showModal();
    /*We have modified code to use custom method open instead of using showModal. We have done this changes using useImperative React hook */
    //dialogRef.current.open();
    //}, targetTime * 1000); //to convert seconds to milliseconds
  }
  function handleStop() {
    /*
      Well, JavaScript has a clear timeout function,which can be used to stop a timer
      but it needs a pointer at that timer, the ID of that timer you could say as an input.
      Now such a pointer is returned by setTimeout.
      
    */
    //clearTimeout(timer.current);

    /*
     We can't clear an interval with clear timeout instead, we have to use clear interval,
    */
    dialogRef.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialogRef}
        targetTime={targetTime}
        remaningTime={timeRemaning}
        onReset={handlereset}
      />
      {/*
      Above in ResultModal we need to pass the dialog with prop name only as "ref",
      the reason why we can't use custom prop name is in ResultModal we have used
      forwardRef function. So, React recognizes only ref prop name.
      */}
      <section className="challenge">
        <h2>{title}</h2>
        {/*timerExpired && <p>You Lost!</p>*/}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is Running" : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
