import Select from 'react-select';
const TodoInput = ({ todo, setTodo, addTodo, sortTodos, sortSelectOptions}) => { 
  return (
    <div className="input-wrapper">
      <input
        type="text"
        autocomplete="off"
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
      <Select 
        className="react-select"
        classNamePrefix="react-select"
        placeholder="sort by..."
        options = {sortSelectOptions}
        onChange={(e) => {
          sortTodos(e.value);
        }}>
          sort
      </Select>
    </div>
  );
};

export default TodoInput;
