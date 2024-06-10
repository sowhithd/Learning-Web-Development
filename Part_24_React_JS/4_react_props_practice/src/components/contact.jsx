import React from "react";

function Contact(props) {
  return (
    <div className="bottom">
      <p>{props.phone}</p>
      <p>{props.email}</p>
    </div>
  );
}

export default Contact;
