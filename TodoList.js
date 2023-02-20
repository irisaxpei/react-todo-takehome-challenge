import TodoItem from "./TodoItem";

const TodoList = ({ list, remove, editTodo, setTodo, addTodoPriority }) => {
  return (
    <>
      {list?.length > 0 ? (
        <div className="todo-list">
          {list.map((entry, index) => (
            <TodoItem key={index} entry={entry} editTodo={editTodo} setTodo={setTodo} remove={remove} addTodoPriority={addTodoPriority}/> 
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No task found</p>
        </div>
      )}
    </>
  );
};

export default TodoList;

