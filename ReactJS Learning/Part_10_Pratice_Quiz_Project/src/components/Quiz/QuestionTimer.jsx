import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remaningTime, setRemaningTime] = useState(timeout);
  /*
   In development phase as we have wrapped root id with React.StrictMode in main.jsx,  due to that every component
   gets executed twice.
   
   As questionTimer gets executed twice what was the issue?
   * The progress bar is depleting too quickly. We have a ten second timer we observed that the progress bar is empty
     after five seconds. And that's happening because this interval here is actually getting triggered twice due to strict mode
     and therefore we have two intervals running behind the scenes that keep on updating this state.

   To fix this incosistency. We have to clean up the existing interval if this effect function runs again.
   And if we do that, it wouldn't matter if this effect function gets called 10 times, because if we always clean up the 
   old intervals, we'll only have one interval up and running at the same time.

   As we  learned it as a return value in that effect function this cleanup function will then automatically be executed 
   by React. Before it runs this effect function again, or when this component is unmounted from the DOM.
  */
  useEffect(() => {
    const timeOut = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timeOut);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaningTime((previousRemaningTime) => previousRemaningTime - 100);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={remaningTime}
      max={timeout}
      className={mode}
    />
  );
}
