import Input from "./shared/Input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";
export default function Login() {
  
  const {
    value: emailValue,
    handleUserChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError:emailIsInvalid
  } = useInput("",(value)=> isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleUserChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError:passwordIsInvalid
  } = useInput("", (value)=> hasMinLength(value, 6));

function handleSubmit(event) {
    event.preventDefault();
   if(emailIsInvalid || passwordIsInvalid) {
      return;
    }
    console.log(emailValue, passwordValue);
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
          onBlur={handleEmailBlur}
          onChange={handleEmailChange} 
          value={emailValue}
          error={emailIsInvalid && "Please enter a valid email!"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          value={passwordValue}
          onChange={handlePasswordChange}
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
