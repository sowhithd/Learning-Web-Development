import { useRef } from "react";
import Input from "../../shared/Input/Input";
import Modal from "../../shared/Modal/Modal";

export default function NewProject({ onAdd,onCancel }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const modalRef = useRef();

  function CreateNewProject() {
    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDueDate = dueDateRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modalRef.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      duedate: enteredDueDate,
    });
  }
  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
      <h2 className="text-xl font-bold text-stone-700 mt-4 my-4">Invalid Input</h2>
      <p className="text-stone-600 mb-4">OOPS...  looks like you forgot to enter a value.</p>
      <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input feild.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        {/*
        w-[35rem] this is how you can use Tailwind to set a custom value. So a custom width in this case it's a special syntax supported 
        by Tailwind, where you can include the value you wanna have in that class name. And behind the scenes Tailwind will then generate 
        this class for you. That can be very useful if you wanna assign a certain value that's not built into Tailwind.
    */}
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button onClick={onCancel} className="text-slate-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={CreateNewProject}
              className="px-6 py-2 rounded-md bg-stone-800  text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input
            ref={titleRef}
            labelName="Title"
            id="Title"
            type="text"
            name="Title"
          />
          <Input
            ref={descriptionRef}
            isTextArea
            labelName="Description"
            id="Description"
          />
          <Input
            ref={dueDateRef}
            labelName="Due Date"
            id="Due Date"
            type="date"
            name="DueDate"
          />
        </div>
      </div>
    </>
  );
}
