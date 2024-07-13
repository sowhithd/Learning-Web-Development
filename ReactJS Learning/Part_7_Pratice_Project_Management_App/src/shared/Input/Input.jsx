import { forwardRef } from "react";

const Input = forwardRef(function Input({ labelName, isTextArea, ...props },ref) {
    const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
   return (
    <p className="flex flex-col gap-1 my-4">
      <label htmlFor={labelName} className="text-sm font-bold uppercase text-stone-500">{labelName}</label>
      {isTextArea ? <textarea ref={ref} {...props} className={classes}></textarea> : <input ref={ref}  {...props} className={classes} />}
    </p>
  );
});

export default Input;