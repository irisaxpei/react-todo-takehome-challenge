import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import ToDoTagSelect from './TodoTags';
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });


  const [todo, setTodo] = useState({}); // changing this to dictionary to hold things 

  {/* Storing in local storage*/}
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
 }, [todos]);

  const addTodo = () => {
    if (todo.text !== "") { // change to todo.text 
      const newTodo = {
        id: todos.length + 1,
        text: todo.text,
        dueDate: todo.dueDate,
      }; // define newTodo obj
      setTodos([...todos, newTodo]); // replace with newTodo obj 
      setTodo({ 
        text: "",
        dueDate: ""}); // replace todo with empty dictionary 
    }
  };

  const deleteTodo = (entry) => { // change to passing in entire obj 
    const newTodos = todos.filter((todo) => todo.text!==entry.text); // parsing through each obj.text, comparing to obj.text
    setTodos(newTodos); 
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id){ 
        return {...todo, text: newText}
      }
      return todo; 
    });
    setTodos(updatedTodos)
    
  }

  const addTodoPriority = (id, newPriority, newPriorityValue) => {
    console.log(newPriority);
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, priority: newPriority, priorityValue: newPriorityValue }
      }
      return todo;
    });
    setTodos(updatedTodos)
  }

  const clearTodos = () => {
    setTodos([]);
  }

  const sortTodosPriority = () => {
    {/*sort todos by priority}*/}
    const sortedTodos = [...todos].sort((a,b) => {
      const priorityWeight = { 'low': 0, 'medium': 1, 'high': 2 };
      return priorityWeight[a.priorityValue]-priorityWeight[b.priorityValue];
    });
    setTodos(sortedTodos);
  }

  return (
    <div className="App">
      <h1>React Todo App</h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList list={todos} remove={deleteTodo} editTodo={editTodo} setTodos={setTodos} addTodoPriority={addTodoPriority} />
      <button 
          className="clear-button"
          onClick={() => {
            clearTodos();
          }}>
            Clear Todos
          </button>
      {/* sort todos*/}
      <button 
        className="sort button"
        onClick={() => {
          sortTodosPriority();
        }}>
          sort
        </button>
    </div>
  );
};

export default App;
