import React from "react";
import Card from "./card";
import contacts from "../content";

function createCard(contentInfo) {
  return <Card key={contentInfo.id} data={contentInfo} />;
}

function App() {
  console.log(contacts);
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {/* {contacts.map((cd) => (
     <Card key={cd.name} data={cd} />
      ))} */}
      {contacts.map(createCard)}
    </div>
  );
  //return <Card />;
}

export default App;
