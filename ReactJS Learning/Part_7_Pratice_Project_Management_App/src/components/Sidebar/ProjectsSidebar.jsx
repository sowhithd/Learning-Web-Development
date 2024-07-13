import CustomButton from "../../shared/Button/CustomButton";
export default function ProjectsSidebar({
  createProject,
  projects,
  onSelectProject,
  selectedProjectID
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <CustomButton onClick={createProject}> + Add Project</CustomButton>
      </div>
      <ul className="mt-6">
        {projects.map((project) => {
          let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
          if(project.id === selectedProjectID){
            cssClasses += ' bg-stone-800 text-stone-200';
          }
          else{
            cssClasses += ' text-stone-400';
          }
          return (
            <li key={project.id}>
              <button
                onClick={() =>  onSelectProject(project.id)}
                className={cssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
