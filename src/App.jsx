import './App.css';
import Todo from './Pages/Todo';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (taskName.trim() === '' || description.trim() === '') {
      return;
    }

    if (editMode) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, taskName, description, status };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditMode(false);
      setEditTodoId(null);
    } else {
      const newTodo = {
        id: todos.length + 1,
        taskName,
        description,
        status: 'Not Completed',
      };
      setTodos([...todos, newTodo]);
    }

    setTaskName('');
    setDescription('');
    setStatus('Not Completed');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTaskName(todoToEdit.taskName);
      setDescription(todoToEdit.description);
      setStatus(todoToEdit.status);
      setEditMode(true);
      setEditTodoId(id);
    }
  };

  const filterTodos = () => {
    switch (filter) {
      case 'Completed':
        return todos.filter((todo) => todo.status === 'Completed');
      case 'Not Completed':
        return todos.filter((todo) => todo.status === 'Not Completed');
      default:
        return todos;
    }
  };

  return (
    <>
      <div className='text-center'>
        <h1 id='tittle' className=''>
          MY TODO
        </h1>
        <br />

        {/* INPUT FIELD */}

        <div className='row ms-5'>
          <div className='form-group'>
          </div>
          <div className='col  '>
          <input
              className='form-control mb-1'
              type='text'
              placeholder='Todo Name'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className='col-6  '>
          <input
              className='form-control mb-1 '
              type='text'
              placeholder='Todo Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='col-2 '>
            <div className='btn glow-on-hover mb-3 ' onClick={addTodo}
              > {editMode ? 'Update Todo' : 'Add Todo'}</div>
          </div>
        </div>
      </div>

      {/* STATUS BAR */}

      <div className='mytodos '>
        <div className='row'>
          <div className='col my'>
          <h2 className=''>
          My To-Do's
        </h2>
          </div>
          <div className='col  text-end st'>
          <h4>
          <div className=''>
          <label htmlFor='filter'>
            <b>Status Filter:</b>
          </label>
          <select value={filter} name='filter' onChange={(e) => setFilter(e.target.value)} >
            <option value='All' className='all bg-yellow'>
              All
            </option>
            <option
              value='Completed'
              className='complete bg-success text-white'
            >
              Completed
            </option>
            <option value='Not Completed' className='bg-danger text-white'>
              Not Completed
            </option>
          </select>
        </div>
        </h4>
          </div>
        </div>
      </div>


      {/* TODO TASK CARDS */}

      <div className='container mt-5'>
        {filterTodos().map((todo) => (
          <div className='' key={todo.id}>
            <Todo
              todo={todo}
              updateStatus={updateStatus}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
