import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import ToDoTagSelect from './TodoTags';
import Select from 'react-select';
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
    const newTodos = todos.filter((todo) => todo.id!==entry.id); // parsing through each obj.text, comparing to obj.text
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

  const sortSelectOptions = [
    { value: 'priority', label: 'Priority' },
    { value: 'date', label: 'Date' }
  ]
  const sortTodos = (e) => {
    let sortedTodos;
    if (e ===  "priority") {
      {/*sort todos by priority}*/}
      sortedTodos = [...todos].sort((a,b) => {
        const priorityWeight = { 'low': 0, 'medium': 1, 'high': 2 };
        return priorityWeight[b.priorityValue]-priorityWeight[a.priorityValue];
      });
    }
    else {
      console.log(e);
      console.assert( e==="date", "is not date");
      sortedTodos = [...todos].sort((a,b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }
    setTodos(sortedTodos);
  }

  const duplicate = (entry) => {
    console.log(todos);
    setTodos([...todos, {...entry, id: todos.length + 1}]);
    
  }

  return (
    <div className="App">
      <h1>hello! what will you get done today? &#128262;</h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList list={todos} remove={deleteTodo} editTodo={editTodo} setTodos={setTodos} addTodoPriority={addTodoPriority} duplicate={duplicate} />
      <button 
          className="clear-button"
          onClick={() => {
            clearTodos();
          }}>
            Clear Todos
          </button>
      {/* sort todos*/}
      <Select 
        className="sort-select"
        options = {sortSelectOptions}
        onChange={(e) => {
          sortTodos(e.value);
        }}>
          sort
      </Select>
    </div>
  );
};

export default App;
