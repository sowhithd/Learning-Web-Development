import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  function deleteNote(event) {
    props.removeNote(props.data.key);
    event.preventDefault();
  }
  return (
    <div className="note">
      <h1>{props.data.title}</h1>
      <p>{props.data.content}</p>
      <button onClick={deleteNote}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
