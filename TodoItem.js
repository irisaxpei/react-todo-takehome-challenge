import { useState } from "react";
import TodoTagSelect from './TodoTags';

// Handling edits 
const BeingEditedItem = ({entry, editTodo, editDate, setBeingEdited}) =>{
    return (
    <div className="todo-edit">
                <input 
                    type="text"
                    name="edit"
                    id="todo-box"
                    value={entry.text}
                    placeholder="Edit your to-do item"
                    onChange={(e) => {
                        editTodo(entry.id, e.target.value);

                    }}
                />
                <input 
                    type = "date"
                    id="date-box"
                    name="edit-date"
                    value={entry.dueDate}
                    onChange={(e) => {
                        editDate(entry.id, e.target.value);
                    }}
                />
                <button 
                    className="update-button"
                    onClick={() => {
                        setBeingEdited(false);
                    }}>
                        Update
                    </button>
            </div>
    );

};

const Item = ({entry, setTodos, remove, setBeingEdited, completed, setCompleted, addTodoPriority, duplicate}) => {
    return(
    <>
        {/*for marking item as complete*/}
        <div className="todo">
            <input 
                type="checkbox"
                onChange={(e) => {
                    setCompleted(e.currentTarget.checked);
                }}
                checked={completed}
            />
            {/*edit button shenanigans*/}
            <div className={`todo-entry ${completed ? "todo-completed" : ""} ${isOverdue(entry) ? "todo-overdue": ""}`}>{entry.text}</div>
            <div className={`due-date ${isOverdue(entry) ? "todo-overdue": ""}`}>{entry.dueDate}</div>
                <button
                    className="edit-button"
                    onClick={() => {
                        setBeingEdited(true);
                    }}
                >
                    Edit
                </button>
        {/*delete button stuff */}
                <button
                    className="delete-button"
                    onClick={() => {
                        remove(entry);
                    }}
                >
                    Delete
                </button>
                <button 
                    className="duplicate-button"
                    onClick={() =>{
                        duplicate(entry);
                    }}
                >
                    Duplicate
                    </button>   
        {/* priority dropdown */}
                <TodoTagSelect todo={entry} addTodoPriority={addTodoPriority}/>
        </div>
    </>
)

}

// Handling overdue items 

const isOverdue = (entry) => {
    const now = new Date();
    const due = new Date(entry.dueDate);
    return due<now;
}



const ToDoItem = ({entry, setTodos, editTodo, editDate, remove, addTodoPriority, duplicate}) => {
    const [beingEdited, setBeingEdited] = useState(false);
    const [completed, setCompleted] = useState(false);
    return (
    <>
        {beingEdited ? (
            <BeingEditedItem entry={entry} editTodo={editTodo} editDate={editDate} setBeingEdited={setBeingEdited}/>
        ) : (
        <>
            <Item entry={entry} setTodos={setTodos} remove={remove} setBeingEdited={setBeingEdited} completed={completed} setCompleted={setCompleted} addTodoPriority={addTodoPriority} duplicate={duplicate}/>
        </>
        )}

            </>
    );
    
};
export default ToDoItem;