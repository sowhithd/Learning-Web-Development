import React from "react";
import Avatar from "./Avatar";
import Contact from "./contact";
function Card(props) {
  return (
    <div>
      <div className="card">
        <div className="top">
          <h2 className="name">{props.data.name}</h2>
          <Avatar imgSrc={props.data.imgURL} />
        </div>
        <Contact phone={props.data.phone} email={props.data.email} />
      </div>
    </div>
  );
}

export default Card;
