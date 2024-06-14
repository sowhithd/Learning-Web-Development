import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    key: -1,
  });

  function captureUserInput(event) {
    const { name, value } = event.target;

    setNewNote((previousValue) => ({
      title: name === "title" ? value : previousValue.title || "",
      content: name === "content" ? value : previousValue.content || "",
      key: props.LastIndexNumber + 1,
    }));
  }

  function addNote(event) {
    props.newNote(newNote);
    setNewNote({
      title: "",
      content: "",
      key: -1,
    });
    event.preventDefault();
  }

  function expandCreate() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {/* {isExpanded ? (
          <input
            name="title"
            placeholder="Title"
            onChange={captureUserInput}
            value={newNote.title}
          />
        ) : null} */}

        {/* OR */}
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            onChange={captureUserInput}
            value={newNote.title}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          onChange={captureUserInput}
          value={newNote.content}
          onClick={expandCreate}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={addNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
