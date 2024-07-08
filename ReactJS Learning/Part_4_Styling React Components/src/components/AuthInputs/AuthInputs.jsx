import { useState } from "react";

import Button from "../UI_Style_Elements/Button";
import Input from "../UI_Style_Elements/Input";

/*
import { styled } from "styled-components";
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
*/

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div
      id="auth-inputs"
      className="w-full max-w-sm p-8 mx-auto rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800"
    >
      {/*For above div tag if we want to make sure that this takes all the width it can get but a maximum width of 24 rem, which can be achieved by setting the max dash W dash SM class on this element */}
      {/*<div className="controls">*/}
      {/*<ControlContainer>*/}
      <div className="flex flex-col gap-2 mb-6">
        {/*Below for lable and input element we are applying class dynamically and conditionally*/}
        {/*<Label className={`label ${emailNotValid ? "$invalid " : ""}`}> */}

        <Input
          label="Email"
          type="email"
          invalid={emailNotValid}
          onChange={(event) => handleInputChange("email", event.target.value)}
        />

        {/*
          <Input
            type="password"
            className={passwordNotValid ? "$invalid" : undefined}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
          */}
        <Input
          label="Password"
          type="password"
          invalid={emailNotValid}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
        {/*</ControlContainer>*/}
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" className="text-amber-400 hover:text-amber-500">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
