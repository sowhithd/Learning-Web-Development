import React, { useState } from "react";

function InputArea(props) {
  const [userInput, setUserInput] = useState("");

  function handleInputChange(event) {
    const { value } = event.target;
    setUserInput(value);
  }
  function addItemToList() {
    props.addItem(userInput);
    setUserInput("");
  }

  return (
    <div className="form">
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button>
        <span onClick={addItemToList}>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
