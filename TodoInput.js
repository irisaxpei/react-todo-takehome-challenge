const TodoInput = ({ todo, setTodo, addTodo }) => { 
  return (
    <div className="input-wrapper">
      <input
        type="text"
        name="todo"
        id="todo-box"
        value={todo.text}
        placeholder="add a todo!"
        onChange={(e) => {
          const newTodo = { // making new Todo value here to be set onChange 
            text: e.target.value,
          };
          setTodo(newTodo);
        }}
      />
            
      <input
        type="date"
        name="itemDueDate"
        id="date-box"
        value={todo.dueDate}
        onChange={(e) => {
          const newTodo = {
            text: todo.text,
            dueDate: e.target.value
          };
          setTodo(newTodo);
        }}
      />
      <button className="add-button" id="add-button" onClick={addTodo}>
        Add 
      </button>
    </div>
  );
};

export default TodoInput;
