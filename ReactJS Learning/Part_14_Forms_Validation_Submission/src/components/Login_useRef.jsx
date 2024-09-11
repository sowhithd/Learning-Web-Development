import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid,setEmailIsInvalid]= useState(false);

  const email = useRef();  
  const password = useRef();
  
  function handleSubmit(event) {
    event.preventDefault();
   // console.log("User Entered Email and Password:",email.current.value +' '+password.current.value);
   const userEnteredEmail = email.current.value;
   const userEnteredPassword = password.current.value;

    const emailIsValid = userEnteredEmail.includes('@')

    if(!emailIsValid){
      setEmailIsInvalid(true);
      return;
    }
    setEmailIsInvalid(false);
  }

  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={email}
          />
          <div className="control-error">{emailIsInvalid && <p>Please Enter a Valid Email Address</p> }</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
          />
        </div>
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
