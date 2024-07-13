import { useState } from "react";
import NewProject from "./components/NewProject/NewProject";
import ProjectsSidebar from "./components/Sidebar/ProjectsSidebar";
import NoProjects from "./components/NoProject/NoProjects";
import ViewProject from "./components/ViewProject/ViewProject";

function App() {
  {
    /*
     Idea behind adding this selectedProject property and setting it to undefined initially is that this selectedProject property 
     will be used to either store the ID of the project that was selected when we later have multiple projects.
     Initially, it's undefined, which simply means that we're neither adding a new project, nor have a project selected.
    */
  }
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: [],
  });
  function handleStartAddProject() {
    //selectedProjectID: Undefined means that we're doing nothing. selectedProjectID: Null means that we're adding a new project.
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectID: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((previousState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...previousState,
        selectedProjectID: undefined,
        projects: [...previousState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectID: undefined,
      };
    });
  }

  function handleselectedProject(projectID) {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectID: projectID,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        selectedProjectID: undefined,
        projects: previousState.projects.filter(
          (project) => project.id !== previousState.selectedProjectID
        ),
      };
    });
  }

  function handleAddTask(taskText) {
    setProjectsState((previousState) => {
      const newTask = {
        text: taskText,
        projectID: previousState.selectedProjectID,
        id: Math.random(),
      };
      return {
        ...previousState,
        tasks: [...previousState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(taskID) {
    setProjectsState((previousState) => {
      return {
        ...previousState,
        tasks: previousState.tasks.filter((task) => task.id !== taskID),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (pr) => pr.id === projectsState.selectedProjectID
  );
  const projectRelatedTasks = projectsState.tasks.filter((task)=> task.projectID === projectsState.selectedProjectID);
  // console.log("projectsState",projectsState);
  // console.log("projectRelatedTasks",projectRelatedTasks);
  let content = (
    <ViewProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectRelatedTasks}
    />
  );

  if (projectsState.selectedProjectID === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectID === undefined) {
    content = <NoProjects createProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      {/*
      h-screen class provided by Tailwind CSS, which simply makes sure that child tags takes up all the screen height so that in the end 
      the sidebar will take up the entire available height.
    */}
      <ProjectsSidebar
        createProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleselectedProject}
        selectedProjectID={projectsState.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;
