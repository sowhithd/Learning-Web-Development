import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import CustomButton from "../Button/CustomButton";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialogRef} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        {/*
        The method="dialog" attribute on the <form> element is a special attribute that indicates the form is meant to interact with 
        a dialog. When a form with this attribute is submitted, it will automatically close the dialog it is contained within.

        When the button inside the form is clicked, the form is submitted. Because the form has method="dialog", the default action 
        of submitting this form is to close the dialog it belongs to. 
        This behavior is specific to forms inside a <dialog> element and is part of the HTML5 specification for dialogs.


    */}
          <CustomButton>{buttonCaption}</CustomButton>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
