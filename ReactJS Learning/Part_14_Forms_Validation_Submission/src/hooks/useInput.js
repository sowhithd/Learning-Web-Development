import { useState } from "react";

export function useInput(defaultValue, validationFn) {

    const [userEnteredValue, setUserEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(userEnteredValue);

    function handleUserChange(event) {
        setUserEnteredValue(event.target.value);
        setDidEdit(false);
    }
    
    function handleInputBlur() {
        setDidEdit(true);
    }

      return{
        value:userEnteredValue,
        handleUserChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
      };
}