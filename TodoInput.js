import Select from "react-select";
const TodoInput = ({
  todo,
  setTodo,
  addTodo,
  sortTodos,
  sortSelectOptions,
}) => {
  return (
    <div className="input-wrapper">
      {/* Add Todo Field*/}
      <input
        type="text"
        autocomplete="off"
        name="todo"
        id="todo-box"
        value={todo.text}
        placeholder="add a todo!"
        onChange={(e) => {
          const newTodo = {
            text: e.target.value,
          };
          setTodo(newTodo);
        }}
      />
      {/* Add Date Field*/}
      <input
        type="date"
        name="itemDueDate"
        id="date-box"
        value={todo.dueDate}
        onChange={(e) => {
          const newTodo = {
            text: todo.text,
            dueDate: e.target.value,
          };
          setTodo(newTodo);
        }}
      />
      {/* Add Todo button*/}
      <button className="add-button" id="add-button" onClick={addTodo}>
        Add
      </button>
      {/* Sort by dropdown*/}
      <Select
        className="react-select"
        classNamePrefix="react-select"
        placeholder="sort by..."
        options={sortSelectOptions}
        onChange={(e) => {
          sortTodos(e.value);
        }}
      >
        sort
      </Select>
    </div>
  );
};

export default TodoInput;
