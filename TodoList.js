import TodoItem from "./TodoItem";

const TodoList = ({
  list,
  remove,
  editTodo,
  editDate,
  setTodo,
  addTodoPriority,
  duplicate,
}) => {
  return (
    <>
      {list?.length > 0 ? (
        <div className="todo-list">
          {list.map((entry, index) => (
            <TodoItem
              key={index}
              entry={entry}
              editTodo={editTodo}
              editDate={editDate}
              setTodo={setTodo}
              remove={remove}
              addTodoPriority={addTodoPriority}
              duplicate={duplicate}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>no tasks found, hooray!</p>
        </div>
      )}
    </>
  );
};

export default TodoList;
