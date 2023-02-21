
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const options = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ]

const TodoTagSelect=({todo, addTodoPriority}) => {
    return(
        <div className="todo-tag">
            <Select
                components={animatedComponents}
                placeholder="select priority"
                options={options}
                value={todo.priority}
                name="tags"
                onChange={(e) => {
                    addTodoPriority(todo.id, e, e.value);
                }}
            />
        </div>


    );
}
export default TodoTagSelect;