import React, { useState, useEffect } from 'react';
import './App.css';


function TasksEdit({ Api }) {
  const [title, setTitle] = useState('');
  const [partOfDay, setPartOfDay] = useState('');
  const [type, setType] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activetTasks, setActivetTasks] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const update = allTasks => {
      const activeTasks = allTasks.filter(task => task.active)
      setTasks(allTasks)
      setActivetTasks(activeTasks)
    }
    Api.subscribeTasks(update)
  }, []);

  const tasksList = tasks.filter(task => {
    if (!typeFilter) return task
    return task.type === typeFilter
  }).map((task, id) => (
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
        <div className="new-task-inputs">
          <label htmlFor="task-name-input">Add new task</label>
          <input type="text" id="task-name-input" onKeyDown={handleKeyDown} onChange={e => setTitle(e.target.value)} value={title} />

          <select id="task-type" onChange={e => setType(e.target.value)} value={type}>
            <option value="">--TYPE--</option>
            <option value="dailies">dailies</option>
            <option value="habits">habits</option>
            <option value="chores">chores</option>
            <option value="hobbies">hobbies</option>
          </select>

          <select id="task-day-part" onChange={e => setPartOfDay(e.target.value)} value={partOfDay}>
            <option value="">--part of the day--</option>
            <option value="morning">morning</option>
            <option value="afternoon">afternoon</option>
            <option value="evening">evening</option>
          </select>

          <button onClick={_ => Api.saveTask(title, type, partOfDay)}>SAVE</button>
        </div>
        <div className="new-task-preview">
          <span>{title}</span>
          <span>{type}</span>
          <span>{partOfDay}</span>
        </div>
      </div>

      <div className="tasks-lists-wrapper">
        <div className="tasks-lists-edit">

          <div className="all-tasks-header">
            <h3>Tasks - {typeFilter || 'all'}</h3>
            <div className="tasks-filter">
              <select id="lang" onChange={e => setTypeFilter(e.target.value)} value={typeFilter}>
                <option value="">TYPE -- all</option>
                <option value="dailies">dailies</option>
                <option value="habits">habits</option>
                <option value="chores">chores</option>
                <option value="hobbies">hobbies</option>
              </select>
            </div>
          </div>

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
