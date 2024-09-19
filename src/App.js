import React, {useState, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';

const initialState = [];
function reducer(state, action) {
  switch(action.type) {
    case 'add':
      return [...state, {id: Date.now(), text: action.payload, completed: false}];
    case 'toggle':
      return state.map(todo => todo.id === action.id ? {...todo, completed: !todo.completed} : todo);
    case 'delete':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function App() {
  const [input, setInput] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);
  const handleInputAdd = () => {
    if(input.trim()) {
      dispatch({type: 'add', payload: input});
      setInput('')
    }
  }
  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value) } placeholder={'Enter your todo'} />
      <button onClick={handleInputAdd}>Add Todo</button>
      <hr />
      Todo List:
      <ul>
        {state.map(todo => (
          <li style={{textDecoration: todo.completed ? 'line-through': 'none'}}>
            {todo.text}
            <button onClick={() => dispatch({type: 'toggle', id: todo.id})}>{todo.completed ? 'Undo' : 'Complete'}</button>
            <button onClick={() => dispatch({type: 'delete', id: todo.id})}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
