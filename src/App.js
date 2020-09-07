import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import firebase from 'firebase'
import firebaseConfig from './config/firebase-config'
import { BsArrowRepeat } from 'react-icons/bs';
import TimeSince from './TimeSince'
import RunHelpChore from './RunHelpChore';

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore();

function App() {

  const [entries, setEntries] = useState([]);   // TODO get rid of entries - no more used
  const [marked, setMarked] = useState([]);
  const [dailies, setDailies] = useState([]);
  const [habits, setHabits] = useState([]);
  const [chores, setChores] = useState([]);
  const [activities, setActivities] = useState([]);
  const [auth, setAuth] = useState('ok');

  const doneColors = ['#0080001f', ' #008000a3', ' #008000c9', ' #008000']
  const notDoneColor = '#c5a7c736'



  const subscribeFirebase = () => {
    console.log('database SUBSCRIBED!')

    function myDateFormat(dateIn) {
      var yyyy = dateIn.getFullYear()
      var mm = dateIn.getMonth() + 1
      var dd = dateIn.getDate()
      var min = dateIn.getMinutes()
      var hh = dateIn.getHours()

      if (+mm < 10) mm = '0' + mm
      if (+dd < 10) dd = '0' + dd
      if (+hh < 10) hh = '0' + hh
      if (+min < 10) min = '0' + min
      return yyyy + '-' + mm + '-' + dd + ' => ' + hh + ':' + min
    }

    var date = new Date()
    date.setHours(0)
    date.setMinutes(0)

    db.collection("activities").orderBy("date", 'desc').where("date", ">", date)
      .onSnapshot(function (querySnapshot) {
        var activities = []
        querySnapshot.forEach(doc => {
          let datetime = new Date(doc.data().timestamp)

          const datetimeStr = myDateFormat(datetime)
          activities.push({
            id: doc.id,
            grade: doc.data().grade,
            task: doc.data().task,
            timestamp: doc.data().timestamp,
            partOfDay: doc.data().partOfDay,
            datetime: datetimeStr
          })

        })
        setActivities(items => [...activities])

      })

    db.collection("tasks").orderBy("order").where("active", "==", true)
      .onSnapshot(function (querySnapshot) {
        var tasks = []

        // DEFINE tasks properties
        querySnapshot.forEach(doc =>
          tasks.push({
            id: doc.id,
            categories: doc.data().categories,
            order: doc.data().order,
            level: doc.data().level,
            importance: doc.data().importance,
            type: doc.data().type,
            partOfDay: doc.data().partOfDay
          })
        )

        console.log(tasks)


        let tasksByType = tasks.reduce((prev, curr) => {
          if (!prev[curr.type]) prev[curr.type] = []
          prev[curr.type] = [...prev[curr.type], curr]
          return prev
        }, {})

        const { dailies, habits, chores } = tasksByType
        setDailies(items => [...dailies])
        setHabits(items => [...habits])
        setChores(items => [...chores])


      })
  }

  const getAuth = () => {

    firebase.auth().onAuthStateChanged(function (user) {
      setAuth('yep')
      window.user = user; // user is undefined if no user signed in
      if (!user) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        firebase.auth().signInWithPopup(provider); // Opens a popup window and returns a promise to handle errors.

      } else {
        // TODO this change to user for real :D 
        setAuth('yep')
      }
    });
  }

  useEffect(() => {
    getAuth()
    subscribeFirebase()
    const storedMarked = JSON.parse(localStorage.getItem('marked'))
    if (storedMarked) setMarked(storedMarked)
  }, []);

  useEffect(
    () => {
      localStorage.setItem('marked', JSON.stringify(marked))
    }, [activities]
  )



  const checkActivity = (task) => {
    const newActivity = {
      id: Date.now(),
      timestamp: Date.now(),
      date: new Date(Date.now()),
      task
    }
    db.collection("activities").add(newActivity)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      });

  }


  const getTaskList = tasks => tasks.map((task) => {
    const { id, type, newSection } = task

    const markTask = ({ id }) => {
      if (marked.includes(id)) {
        const newMarked = marked.filter(m => m != id)
        setMarked(newMarked)
        return
      }

      setMarked([...marked, id])
    }

    const showCheckedIcon = ({ id }) => activities.filter(({ task }) => task == id).length > 0

    const getColorByCountDone = ({ id }) => {
      const count = activities.filter(({ task }) => task == id).length

      if (count === 1) return { backgroundColor: doneColors[0] }
      if (count === 2) return { backgroundColor: doneColors[1] }
      if (count === 3) return { backgroundColor: doneColors[2], color: 'white' }
      if (count > 3) return { backgroundColor: doneColors[3], color: 'white' }

      return { backgroundColor: notDoneColor, border: '1px solid blue' }
    }


    return (
      <li key={id} className="task" style={{ marginTop: newSection ? "30px" : "0" }}>
        <button onClick={e => checkActivity(id)} className="btn-main" style={getColorByCountDone(task)}>SAVE</button>
        <span className="task-title" onClick={e => markTask(task)}>
          {id} {marked.includes(id) && '🥦'}
        </span>
      </li>
    )
  }
  )

  const getDailies = () => {
    const todaysActivities = activities.map(({ task }) => task)
    const dailiesFilteredSorted = dailies
      .filter(({ id }) => !todaysActivities.includes(id))
      .sort((a, b) => a.order - b.order)
    const dailiesToRender = dailiesFilteredSorted.map((daily, i) => {
      const nextDaily = dailiesFilteredSorted[i - 1] || 0
      if (nextDaily.partOfDay !== daily.partOfDay)
        return { newSection: true, ...daily }
      return daily

    })

    return getTaskList(dailiesToRender)
  }



  const listTasks = () => {
    return (
      <div className="all-tasks">
        <h3 className="main-sections-header">Dailies</h3>
        <ol className="dailies">
          {getTaskList(dailies)}
          {/* {getDailies()} */}
        </ol>

        <h3 className="main-sections-header">Habits</h3>
        <ol className="habits">
          {getTaskList(habits)}
        </ol>
      </div>
    )
  }


  const updateGrade = (activityId, grade) => {
    var activityRef = db.collection('activities').doc(activityId);
    activityRef
      .update({ grade })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  const timeSincePreviousActivityByIndex = (timestamp, i) => {
    if (i > activities.length - 2) return ''

    let res = ''
    if (i === 0) res = Date.now() - timestamp

    res = timestamp - activities[i + 1]?.timestamp
    const diff = res / 1000

    let hours = Math.floor(diff / 3600);
    let totalSeconds = diff % 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    const addNullIfNeeded = (timePart) => {
      return timePart < 10 ? '0' + timePart : timePart
    }

    return `${addNullIfNeeded(hours)}:${addNullIfNeeded(minutes)}:${addNullIfNeeded(Math.floor(seconds))}`
  }

  const listActivities = activities.map(({ task, id, timestamp, datetime, grade }, i) =>
    <li key={id} className="activity-item">

      <div className="activity-text-section">
        <button className="grade-btn repeat-btn" onClick={() => checkActivity(task)}><BsArrowRepeat style={{ width: '20px', height: '20px' }} /></button>
        {task} - {datetime}
      </div>
      <div className="activity-btns-section">

        <button className="grade-btn" disabled={grade == 100} onClick={() => updateGrade(id, 100)}>just</button>
        <button className="grade-btn" disabled={grade == 200} onClick={() => updateGrade(id, 200)}>ok</button>
        <button className="grade-btn" disabled={grade == 300} onClick={() => updateGrade(id, 300)}>great</button>
        {timeSincePreviousActivityByIndex(timestamp, i)}
      </div>

    </li>
  );




  const onReset = () => {
    setMarked([])

  }

  const onKeyPressed = (event) => {
    try {
      const index = (+event.key) - 1

      // TODO change entries to dailies or other
      const activity = entries[index].title
      console.log(activity, index)

      //checkActivity(activity)
    } catch (e) {
      console.log(e)
    }
  }

  

  function TasksEdit() {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');

    const tasks = [...dailies, ...habits, ...chores]
    const saveTask = (e) => {
      if (title == '' || type == '') {
        alert('set task and type')
        return
      }
      db.collection("tasks").doc(title).set({
        active: true,
        categories: [],
        importance: 100,
        isDaily: true,
        level: 1,
        order: 20,
        type
      })
    }

    const tasksList = tasks.map((task, id) => (<li key={id}>{task.id} - {task.type}</li>))

    const handleKeyDown = (event) => {
      if (event.key !== 'Enter') return
      saveTask()
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

          <button onClick={saveTask}>SAVE</button>
          {/* <RunHelpChore activities={activities}/> */}
          <p>{title} - {type}</p>
        </div>

        <ul>
          {tasksList}
        </ul>

      </div>
    )
  }


  function Home({ activities }) {
    return (
      <div className="super-wrapper" onKeyDown={onKeyPressed} tabIndex="0">
        <button className="reset-btn" onClick={e => onReset()}>Reset</button>
        <div className="wrapper">
          <div className="tasks-wrapper">
            <div className="tasklist">
              {listTasks()}
            </div>
          </div>
          <div className="dailies-list">
            <h3 className="main-sections-header">Dailies Left</h3>
            <ol className="dailies">
              {getDailies()}
            </ol>
            <h3 className="main-sections-header">Chores</h3>
            <ol className="chores">
              {getTaskList(chores)}
            </ol>
          </div>
          <div className="task-log">
            <div className="time-since-wrapper">
              <TimeSince activities={activities} />
            </div>
            <ol className="loglist">{listActivities}</ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    auth === 'yep' &&
    <div className="App">

      <Router>
        <div>


          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/tasks-edit">
              <TasksEdit />
            </Route>
            <Route path="/">
              <Home activities={activities} />
            </Route>
          </Switch>


          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasks-edit">Task Edit</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>



    </div>
  );
}

export default App;
