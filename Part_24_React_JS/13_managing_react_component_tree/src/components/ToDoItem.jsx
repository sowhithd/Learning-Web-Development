import React, { useState } from "react";

function ToDoItem(props) {
  const [isTaskCompleted, setTaskStatus] = useState(false);
  //   function onTaskComplete(event) {
  //     // const status = isTaskCompleted ? false : true;
  //     // setTaskStatus(status);
  //     //OR

  //     setTaskStatus((previousValue) => {
  //       return !previousValue;
  //     });
  //   }

  return (
    // <div>
    //   <li
    //     onClick={onTaskComplete}
    //     style={{ textDecoration: isTaskCompleted ? "line-through" : "none" }}
    //   >
    //     {props.text}
    //   </li>
    // </div>

    //In JavaScript functions whenever you have a set of
    //parentheses and something inside it,
    //then you're going to be calling the function,
    //rather than passing the function.

    //In this case The method "props.onChecked()" is just
    //going to call it immediately the moment that this
    //ToDoItem gets rendered.

    //Instead what we can do in our onClick is to
    //create a function, and this function will only get
    //called when the div detects the onClick event.

    <div
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
