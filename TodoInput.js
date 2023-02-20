const TodoInput = ({ todo, setTodo, addTodo }) => { 
  return (
    <div className="input-wrapper">
      <input
        type="text"
        name="todo"
        value={todo.text}
        placeholder="Create a new todo"
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
        value={todo.dueDate}
        onChange={(e) => {
          const newTodo = {
            text: todo.text,
            dueDate: e.target.value
          };
          setTodo(newTodo);
        }}
      />
      <button className="add-button" onClick={addTodo}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
