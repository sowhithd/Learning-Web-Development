import Tasks from "../Tasks/Tasks";

export default function ViewProject ({ project,onDelete,onAddTask,onDeleteTask,tasks }) {
    const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(project.duedate).toLocaleDateString("en-US", options);
  return (

        <div className="w-[35rem] mt-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300 ">
        <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
        <button onClick={onDelete} className="text-stone-600 hover:text-stone-950">Delete</button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        {/*
            whitespace-pre-wrap is added to below paragraph tage to make sure that line breaks that are added in this description 
            field are kept and are not removed.
        */}
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
        </header>
        <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
        </div>

  );
}
