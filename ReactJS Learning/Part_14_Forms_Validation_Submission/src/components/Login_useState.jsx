import { useState } from "react";
import Input from "./shared/Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";

export default function Login() {
  const [userEnteredValues, setUserEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(userEnteredValues.email) 
    //&&
    //!isNotEmpty(userEnteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(userEnteredValues.password, 6);

  {
    /*
    * Button inside form(HTML element) will generate requests and send those requests to the server
      that's serving the site.
      
    * Technically that means that an HTTP request is created and is sent to the server that's serving the website. 
      This is the default built-in behavior.

    * But in this case here for this React application, that's a problem becuase the action to submit the user
      entered changes is not prepared to handle this form submission. We have no code on that server
      that would deal with that submission.

    * Even the React Application is deployed to realworld application user end, still server only aims
      to serve this "index.html" file  and all associated JavaScript files and it still wouldn't be a server
      that is prepared to handle incoming form requests. So therefore, this default behavior here is a problem.   
*/
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userEnteredValues);
  }

  function handleUserChange(event, inputIdentifier) {
    setUserEnteredValues((previousValues) => ({
      ...previousValues,
      [inputIdentifier]: event.target.value,
    }));

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [inputIdentifier]: false,
    }));
  }

  function handleInputBlur(inputIdentifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [inputIdentifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          value={userEnteredValues.email}
          onChange={(event) => handleUserChange(event, "email")}
          error={emailIsInvalid && "Please enter a valid email!"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur("password")}
          value={userEnteredValues.password}
          onChange={(event) => handleUserChange(event, "password")}
          error={passwordIsInvalid && "Please enter a valid password!"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        {/*
          If you set the type attribute to button on a button HTML element in a form, that button will not submit the form
          because the default type attribute is submit.
        */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
