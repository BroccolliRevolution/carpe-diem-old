import React, { useState, useEffect } from 'react';
import './App.css';


function TasksEdit({Api}) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [tasks, setTasks] = useState([]);

    const updateTasks = (updateFn) => {
        const update = tasks => {
          let tasksByType = tasks.reduce((prev, curr) => {
            if (!prev[curr.type]) prev[curr.type] = []
            prev[curr.type] = [...prev[curr.type], curr]
            return prev
          }, {})
          const { dailies, habits, chores, hobbies } = tasksByType
    
          setTasks(items => tasks)
        }
    
        updateFn(update)
    
      }

    useEffect(() => {
        updateTasks(Api.subscribeTasks)
      }, []);

    const tasksList = tasks.length > 0 ? tasks.map((task, id) => (<li key={id}>{task.id} - {task.type}</li>)): ''
    
    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') return
        Api.saveTask(title, type)
        setTitle('')
      }
  
      return (
        <div className="task-list-wrapper">
  
          <div className="new-task">
            <label htmlFor="task-name-input">Add new task</label>
            <input type="text" id="task-name-input" onKeyDown={handleKeyDown} onChange={e => setTitle(e.target.value)} value={title} />
  
            <select id="lang" onChange={e => setType(e.target.value)} value={type}>
              <option value="">TYPE</option>
              <option value="dailies">dailies</option>
              <option value="habits">habits</option>
              <option value="chores">chores</option>
              <option value="hobbies">hobbies</option>
            </select>
  
            <button onClick={_ => Api.saveTask(title, type)}>UP</button>
            <button onClick={_ => Api.saveTask(title, type)}>SAVE</button>
            {/* <RunHelpChore activities={activities}/> */}
            <p>{title} - {type}</p>
          </div>
  
          <ul>
            {tasksList}
          </ul>
  
        </div>
      )
}

export default TasksEdit;
