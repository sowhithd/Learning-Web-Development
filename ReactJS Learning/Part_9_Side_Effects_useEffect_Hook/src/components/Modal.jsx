/*
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
*/

/////////////////////////////  Utilizing Modal by using useEffect Hook  ///////////////////////////////////////////////////////////////////

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ open, onClose, children }) {
  const dialog = useRef();
  /*
    
  If we keep if and else condition without using useEffect we will get the error that can be seen in browser console
    saying "Cannot read properties of undefined (reading 'close')"  we will be getting this error on first app load and 
    
    Reason for getting this error even we used useRef hook for dialog is ref will not be set yet. Meaning it will not be connected yet
    because the JSX code hasn't executed yet while executing the if and else condition.
    
    So, this connection between a ref and dialog element hasn't been established yet and therefore calling close method fails because 
    initially, this ref is undefined.

    And that's another scenario where you wanna use useEffect. And we can indeed think of below code here as kind of a "side effect" 
    as well because while calling these methods here will indeed have an impact on the UI, but it does not have a direct impact on 
    this JSX code here. So, it's again not directly related to this component render cycle.
    
    Effect Dependencies:
    It is a prop or state values that are used inside of this useEffect hook.
    
    Any value that causes the component function to execute again, which is the case in the end for props and state, any such value is 
    a dependency if it's used inside of useEffect.
    
    In addition other effect dependencies would be functions or context values that depend of useState of props.

    Any other value like refs or as we have it here in the app component function objects and methods that are built into the browser,
    any such value are "not considered dependencies" because useEffect only cares about dependencies that would 
    cause the component function to execute again
  */
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); //useEffect hook second parameter in this scenario is call  "Effect Dependencies"

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
