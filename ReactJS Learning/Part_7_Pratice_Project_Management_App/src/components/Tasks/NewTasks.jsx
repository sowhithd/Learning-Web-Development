import { useState } from "react";

export default function NewTask({onAdd}) {
  const [enteredTask, setEntetedTask] = useState('');
  
  function handleChange(event) {
    setEntetedTask(event.target.value);
  }
  
  function handleClick(){
    if(enteredTask.trim() === '')
        return; 
    onAdd(enteredTask);
    setEntetedTask('');
  }

  return (
    <div className="flex items-center gap-4">
      <input type="text" onChange={handleChange} value={enteredTask} className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
      <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
  );
}
