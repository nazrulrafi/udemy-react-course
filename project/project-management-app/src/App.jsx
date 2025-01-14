import {useEffect} from "react";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject.jsx";
function App() {
    // Retrieve state from localStorage or use default state
    const [projectState, setProjectState] = useState(() => {
        const savedState = localStorage.getItem("projectState");
        return savedState
            ? JSON.parse(savedState)
            : {
                selectedProjectId: undefined,
                projects: [],
                tasks: [],
            };
    });

    // Save projectState to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("projectState", JSON.stringify(projectState));
    }, [projectState]);

    function handleAddTask(text){
        setProjectState((prevState)=>{
            const taskId = Math.random();
            const newTask = {
                text:text,
                id:taskId,
                projectId:projectState.selectedProjectId,
            }
            return {
                ...prevState,
                tasks:[newTask,...prevState.tasks]
            }
        })

    }
    function handleDeleteTask(id){
        setProjectState((prevState)=>{
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id)
            }
        })
    }
    function handleStartAddProject(){
        setProjectState(prevState=>{
            return {
                ...prevState,
                selectedProjectId: null
            }
        })
    }
    function handleAddProject(projectData){
        setProjectState(prevState=>{
            const projectId = Math.random();
            const newProjects = {
                ...projectData,
                id: projectId
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects:[...prevState.projects,newProjects]
            }

        })
    }
    function handleCancelAddProject(){
        setProjectState(prevState=>{
            return {
                ...prevState,
                selectedProjectId: undefined
            }
        })
    }
    // Select a project
    function handleSelectedProject(id) {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            }
        });
    }
    function handleDeleteProject(){
        setProjectState(prevState=>{
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects:prevState.projects.filter(
                    project => project.id !== prevState.selectedProjectId
                )
            }
        })
    }
    const selectedProject = projectState.projects.find(
        (project)=> project.id === projectState.selectedProjectId
    )

    let content;
    if (projectState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    }else if(selectedProject){
        content = <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks = {projectState.tasks}
            selectedId = {projectState.selectedProjectId}
        />
    }else {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
    }
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
          <ProjectSidebar
              onStartAddProject={handleStartAddProject}
              projects={projectState.projects}
              onSelectedProject = {handleSelectedProject}
          />
          {content}
      </main>
    </>
  );
}

export default App;
