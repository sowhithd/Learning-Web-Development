import { useEffect, useState } from "react";
export default function ProgressBar({ Timer }) {
  const [remaningTime, setRemaningTime] = useState(Timer);
  /*
   Also we must update this state multiple times per second to make sure that we got a smoothly animating progress bar.
   And to do that, we can use another function built into the browser, the setInterval function that will be executed every couple 
   of milliseconds.
 */

  useEffect(() => {
    const interval = setInterval(() => {
      //function which is executed super frequently where I wanna update the remainingTime and deduct 10 milliseconds from the timer
      console.log("Inside setInterval Method");
      setRemaningTime((previousTime) => previousTime - 10);
    }, 10); //For every 10 milliseconds so that we execute it 100 times per second.

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remaningTime} max={Timer} />;
  {
    /*Above we need to set a max value so that the fill status of this progress bar can be calculated automatically by the browser.*/
  }
}
