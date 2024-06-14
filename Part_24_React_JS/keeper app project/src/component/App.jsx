import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import notes from "../notes";
import CreateArea from "./CreateArea";

function App() {
  const [notesList, setNotesList] = useState(notes);
  function addNewNoteToNoteArray(newNote) {
    setNotesList((previousList) => [...previousList, newNote]);
    console.log("addNewNoteToNoteArray", notesList);
  }
  function deleteNoteFromList(id) {
    console.log("deleteNoteFromList method", id);
    setNotesList((previousList) => {
      return previousList.filter((note, index) => {
        // console.log("deleteNoteFromList method filter each loop", index);
        // console.log("deleteNoteFromList method filter criteria", index !== id);
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea
        newNote={addNewNoteToNoteArray}
        LastIndexNumber={notesList[notesList.length - 1].key}
      />
      {/*
        Using Arrow function in order to pass a function 
        that maps through our array of notes, and for each 
        of the notes inside the array, it's going to carry out 
        this functionality which is to create a new note using 
        the properties from that noteItem 
     */}
      {notesList.map((note) => (
        <Note key={note.key} data={note} removeNote={deleteNoteFromList} />
      ))}

      <Footer />
    </div>
  );
}
export default App;
