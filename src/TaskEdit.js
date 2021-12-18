import React, { useState, useEffect } from 'react';
import './App.css';


function TasksEdit({ Api }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activetTasks, setActivetTasks] = useState([]);

  useEffect(() => {
    const update = allTasks => {
      const activeTasks = allTasks.filter(task => task.active)
      setTasks(allTasks)
      setActivetTasks(activeTasks)
    }
    Api.subscribeTasks(update)
  }, []);

  const tasksList = tasks.map((task, id) => (
    <li key={id}>
      <input
        type="checkbox"
        checked={task.active}
        onChange={e => Api.updateTask({ ...task, active: !task.active })}
      />
      <input type="number" id="goal-order-input" style={{ width: '40px' }} onChange={e => {
        const order = parseInt(e.target.value)
        Api.updateTask({ ...task, order })
      }} value={task.order} />
      {task.id} - {task.type}
    </li>)
  )

  const activeTasksList = activetTasks.map((task, id) => (
    <li key={id}>
      {task.id} - {task.type}
    </li>)
  )

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
        <p>{title} - {type}</p>
      </div>

      <div className="tasks-lists-wrapper">
        <div className="tasks-lists-edit">
          <h3>All Tasks</h3>
          <ul>
            {tasksList}
          </ul>
        </div>
        <div className="tasks-lists-edit">
          <h3>Active Tasks</h3>
          <ol>
            {activeTasksList}
          </ol>
        </div>
      </div>

    </div>
  )
}

export default TasksEdit;
