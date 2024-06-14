import React from "react";
import CreateInputElement from "./Input";
function Form(props) {
  return (
    <div>
      <form className="form">
        <CreateInputElement type="text" placeholder="Username" />
        <CreateInputElement type="password" placeholder="Password" />
        {!props.userRegistered && (
          <CreateInputElement type="password" placeholder="Confirm Password" />
        )}
        <button type="submit">
          {props.userRegistered ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
export default Form;
