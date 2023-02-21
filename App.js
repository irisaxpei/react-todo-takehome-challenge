import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import ToDoTagSelect from "./TodoTags";
import Select from "react-select";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todo.text !== "") {
      const newTodo = {
        id: todos.length + 1,
        text: todo.text,
        dueDate: todo.dueDate,
      };
      setTodos([...todos, newTodo]);
      setTodo({
        text: "",
        dueDate: "",
      });
    }
  };

  const deleteTodo = (entry) => {
    const newTodos = todos.filter((todo) => todo.id !== entry.id);
    setTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editDate = (id, newDate) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, dueDate: newDate };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const addTodoPriority = (id, newPriority, newPriorityValue) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          priority: newPriority,
          priorityValue: newPriorityValue,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const clearTodos = () => {
    setTodos([]);
  };
  const sortSelectOptions = [
    { value: "priority", label: "Priority" },
    { value: "date", label: "Date" },
  ];
  const sortTodos = (e) => {
    let sortedTodos;
    if (e === "priority") {
      {
        /*sort todos by priority}*/
      }
      sortedTodos = [...todos].sort((a, b) => {
        const priorityWeight = { low: 0, medium: 1, high: 2 };
        return (
          priorityWeight[b.priorityValue] - priorityWeight[a.priorityValue]
        );
      });
    } else {
      {
        /*sort todos by date}*/
      }
      console.assert(e === "date", "is not date");
      sortedTodos = [...todos].sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }
    setTodos(sortedTodos);
  };

  const duplicate = (entry) => {
    setTodos([...todos, { ...entry, id: todos.length + 1 }]);
  };

  return (
    <div className="App">
      <h1>hello! what will you get done today? &#128262;</h1>
      <TodoInput
        todo={todo}
        setTodo={setTodo}
        addTodo={addTodo}
        sortTodos={sortTodos}
        sortSelectOptions={sortSelectOptions}
      />
      <TodoList
        list={todos}
        remove={deleteTodo}
        editTodo={editTodo}
        editDate={editDate}
        setTodos={setTodos}
        addTodoPriority={addTodoPriority}
        duplicate={duplicate}
      />
      <button
        className="clear-button"
        onClick={() => {
          clearTodos();
        }}
      >
        Clear Todos
      </button>
    </div>
  );
};

export default App;
