import NewTask from "./NewTask.jsx";

export default function Tasks({onAddTask,onDeleteTask,tasks,selectedId}) {
    const filteredTasks = tasks.filter(task => task.projectId === selectedId);

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onAddTask={onAddTask} />
            {filteredTasks.length === 0 && (
                <p className="text-stone-800 mb-4">
                    This proket doet not have any task yet
                </p>
            )}
            {filteredTasks.length > 0 && (
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {filteredTasks.map((task, index) => (
                        <li key={task.id} className="flex justify-between my-4">
                            <span>{task.text}</span>
                            <button
                                className="text-stone-800 hover:text-red-500"
                                onClick={()=>onDeleteTask(task.id)}
                            >Clear</button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}









