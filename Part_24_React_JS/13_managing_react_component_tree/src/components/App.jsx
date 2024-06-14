import React, { useState } from "react";
import InputArea from "./InputArea";
import ToDoItem from "./ToDoItem";

function App() {
  const [toDoList, setToDoList] = useState([]);

  function addItemToMyToDoList(newItem) {
    setToDoList((previousItems) => [...previousItems, newItem]);
  }
  /*
   This entire function is being packaged up and sent over 
    to the ToDoItem under the prop onChecked.
    And then that prop is only triggered when this div 
    detects a click.
  */
  function deleteItem(id) {
    setToDoList((previousItems) => {
      return previousItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea addItem={addItemToMyToDoList} />
      <div>
        <ul>
          {toDoList.map((todo, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todo}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
