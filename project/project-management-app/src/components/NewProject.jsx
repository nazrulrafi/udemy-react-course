import Input from "./Input.jsx";
import {useRef} from "react";
import Modal from "./Modal.jsx";

export default function NewProject({onAdd,onCancel}) {
    const title = useRef();
    const description = useRef();
    const date = useRef();

    const modal = useRef();

    function handleToSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = date.current.value;
        if (enteredTitle.trim() === "" || enteredDueDate.trim() === "" || enteredDueDate.trim() === ""){
            modal.current.open()
            return;
        }
        onAdd({
            title:enteredTitle,
            description:enteredDescription,
            dueDate:enteredDueDate
        })
    }
    return(
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-500 my-4">Invalid input</h2>
                <p className="text-stone-400 mb-4">Opps. looks like you forgot to enter a value</p>
                <p className="text-stone-400 mb-4">Lorem ipsum dolor sit amet cum distinctio id minus nemo quibusdam tempore?</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button></li>
                    <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950" onClick={handleToSave}>Save</button></li>
                </menu>
                <div>
                    <Input ref={title} type="text" label="Title"/>
                    <Input ref={description} type="textarea" label="Description" textarea={true}/>
                    <Input ref={date} type="date" label="Due Date"/>
                </div>
            </div>
        </>
    )
}











