import {useState} from "react";

export default function NewTask({onAddTask}) {
    const [enterTask, setEnterTask] = useState();
    function handleChange(e) {
        setEnterTask(e.target.value);
    }
    function handleAddTask() {
        if (enterTask.trim() === ""){
            return
        }
        onAddTask(enterTask);
        setEnterTask("")
    }
    return(
        <div className="flex flex-row gap-4 items-center">
            <input
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                onChange={handleChange}
                value={enterTask}
            />
            <button
                onClick={handleAddTask}
                className="text-stone-700 hover:text-stone-950">
                Add Task
            </button>
        </div>
    )
}