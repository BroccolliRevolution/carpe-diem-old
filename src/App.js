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
import { BsArrowRepeat, BsTrophy } from 'react-icons/bs';
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
  const [hobbies, setHobbies] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [todaysReward, setTodaysReward] = useState(0);
  const [auth, setAuth] = useState('ok');
  const [dateOffset, setDateOffset] = useState(0);

  const doneColors = ['#0080001f', ' #008000a3', ' #008000c9', ' #008000']
  const notDoneColor = '#c5a7c736'

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

const subscribeActivities = (dateOffset) => {
  var date = new Date(Date.now()); 
  var prev_date = new Date();
  date.setDate(prev_date.getDate() - dateOffset);
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
            task: doc.data().task,
            timestamp: doc.data().timestamp,
            partOfDay: doc.data().partOfDay,
            greade: doc.data().grade,
            reward: doc.data().reward,
            datetime: datetimeStr,
            project: doc.data().project,
          })

        })
        setActivities(items => [...activities])
        const rewards = activities.map(activity => activity?.reward || 0)
        setTodaysReward(rewards.reduce((prev, curr) => prev + curr, 0))

      })
}

const subscribeTasks = () => {
  db.collection("tasks").orderBy("order").where("active", "==", true)
      .onSnapshot(function (querySnapshot) {
        var tasks = []

        // DEFINE tasks properties
        querySnapshot.forEach(doc =>
          tasks.push({
            id: doc.id,
            title: doc.data().title,
            categories: doc.data().categories,
            order: doc.data().order,
            level: doc.data().level,
            importance: doc.data().importance,
            type: doc.data().type,
            partOfDay: doc.data().partOfDay,
            project: doc.data().project,
          })
        )

        console.log(tasks)


        let tasksByType = tasks.reduce((prev, curr) => {
          if (!prev[curr.type]) prev[curr.type] = []
          prev[curr.type] = [...prev[curr.type], curr]
          return prev
        }, {})

        console.log(tasksByType)
        const { dailies, habits, chores, hobbies } = tasksByType


        setDailies(items => [...dailies])
        setHabits(items => [...habits])
        setChores(items => [...chores])
        setHobbies(items => [...hobbies])
        setTasks(items => [...dailies, ...habits, ...chores, ...hobbies])
        

      })
}

  const subscribeFirebase = () => {
    console.log('database SUBSCRIBED!')

    subscribeActivities(dateOffset)    
    subscribeTasks()
    
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

  const getActivityReward = (task) => {
    const randVar = Math.floor(Math.random() * 9) + 1
    let randConst = 1
    if (randVar < 3) {
      randConst = 0
    }

    if (randVar > 8) {
      randConst = 2
    }
    
    const importance = tasks.find(({id}) => id === task)?.importance || 0
    return randConst * importance
  }


  const checkActivity = (task) => {  

    const project = tasks.find(({id}) => id === task)?.project || ''

    const newActivity = {
      id: Date.now(),
      timestamp: Date.now(),
      date: new Date(Date.now()),
      task,
      reward: getActivityReward(task),
      project
    }
    db.collection("activities").add(newActivity)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      });

  }

  const changeOrder = ({ id, order }, by) => {
    db.collection("tasks").doc(id)
      .update({ order: order - by })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }


  const getTaskList = (tasks, showEditOrder) => tasks.map((task) => {
    const { id, type, newSection, title, importance } = task

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
        {showEditOrder && <button onClick={e => changeOrder(task, +1)}>🔼</button>}
        {showEditOrder && <button onClick={e => changeOrder(task, -1)}>🔽</button>}
        <button onClick={e => checkActivity(id)} className="btn-main" style={getColorByCountDone(task)}>SAVE</button>
        <span className="task-title" onClick={e => markTask(task)}>
          {title || id}  {marked.includes(id) && '🥦'}{showEditOrder && (' - ' + task.order)}
        </span>
      </li>
    )
  })

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

  const deleteActivity = id => {
    db.collection('activities').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

  const listActivities = activities.map(({ task, id, timestamp, datetime, grade, reward, project }, i) =>
    {
      const eee = tasks
      
      return (
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
        <button className="grade-btn" onClick={() => deleteActivity(id)}>x</button>
        
         ----->{reward}
          {/* .... {project} */}
      </div>

    </li>
      )
    }
  );

  const onReset = () => {
    setMarked([])
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

          <button onClick={saveTask}>UP</button>
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
    const [dailiesType, setDailiesType] = useState('All');
    const [showEditOrder, setShowEditOrder] = useState(false);

    const getDailiesByType = () => dailiesType === 'All' ? getDailies() : getTaskList(dailies, showEditOrder)
    const onShowEditOrder = () => setShowEditOrder(!showEditOrder)

  
    return (
      <div className="super-wrapper" tabIndex="0">
        <button className="reset-btn" onClick={e => onReset()}>Reset</button>
        <button className="reset-btn" onClick={e => onShowEditOrder()}>Show Order</button>
        <div className="wrapper">
          <div className="tasks-wrapper">
            <div className="tasklist">
              <div className="all-tasks">

                <h3 className="main-sections-header">All Dailies</h3>
                <ol className="habits">
                  {getTaskList(dailies, showEditOrder)}
                </ol>

                <h3 className="main-sections-header">Habits</h3>
                <ol className="habits">
                  {getTaskList(habits, showEditOrder)}
                </ol>
              </div>
            </div>
          </div>
          <div className="dailies-list">

            <h3 className="main-sections-header">
              Dailies <button onClick={e => setDailiesType(() => dailiesType === 'Left' ? 'All' : 'Left')}>{dailiesType}</button>
              {getDailiesByType().length === 0 && <div className="all-done">
                <div className="all-done-text">ALL DONE for today!!!</div>
                <span>✔️✔️✔️</span></div>}
            </h3>

            <ol className="dailies">
              {getDailiesByType()}
            </ol>


            <h3 className="main-sections-header">Hobbies</h3>
            <ol className="habits">
              {getTaskList(hobbies, showEditOrder)}
            </ol>


            <h3 className="main-sections-header">Chores</h3>
            <ol className="chores">
              {getTaskList(chores, showEditOrder)}
            </ol>
          </div>
          <div className="task-log">
            <div className="time-since-wrapper">
              <TimeSince activities={activities} />
            </div>
            <div className="reward">
              Today's reward: {todaysReward} <BsTrophy style={{color: '#F0E68C',  width: '40px', height: '40px' }}></BsTrophy>
            </div>
            <ol className="loglist">{listActivities}</ol>
            <button className="" style={{'paddingLeft': '50px', 'paddingRight': '50px', 'marginLeft': '50px'}} onClick={() => {
              let newDate = dateOffset + 1
              setDateOffset(prev => newDate)
              subscribeActivities(newDate)
            }}>more ... </button>

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
