import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import firebase from 'firebase'
import firebaseConfig from './config/firebase-config'

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore();

function App() {
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState([]);
  const [activities, setActivities] = useState([]);


  const subscribeFirebase = () => {
    console.log('database SUBSCRIBED!')
    db.collection("tasks").orderBy("id")//.where("title", "==", "aha")
      .onSnapshot(function (querySnapshot) {
        var tasks = []
        querySnapshot.forEach(doc =>
          tasks.push({
            id: doc.id,
            title: doc.data().title
          })
        )
        setEntries(items => [...tasks])
      })

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


    db.collection("activities").orderBy("timestamp")//.where("title", "==", "aha")
      .onSnapshot(function (querySnapshot) {
        var activities = []
        querySnapshot.forEach(doc => {
          let datetime = new Date(doc.data().timestamp)

          const datetimeStr = myDateFormat(datetime)
          console.log(datetimeStr)
          activities.push({
            id: doc.id,
            task: doc.data().task,
            timestamp: doc.data().timestamp,
            datetime: datetimeStr
          })


        }

        )

        console.log(activities)
        setActivities(items => [...activities])
      })
  }

  useEffect(() => {
    subscribeFirebase()
  }, []);

  const saveFirebase = (e) => {
    if (title == '') return

    const item = {
      id: Date.now(),
      title
    }
    db.collection("tasks").add(item)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      });
  }

  const checkActivity = (task) => {
    const newActivity = {
      id: Date.now(),
      timestamp: Date.now(),
      date: new Date(Date.now()),
      task
    }

    console.log(newActivity)

    db.collection("activities").add(newActivity)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      });

  }

  const listTasks = entries.map(({ title, id }) =>
    <li key={id}>
      <button onClick={e => checkActivity(title, e)}>SAVE</button>
      {title} - {id}
    </li>
  );

  const listActivities = activities.map(({ task, id, timestamp, datetime }) =>
    <li key={id}>
      {task} - {datetime}
    </li>
  );


  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') return
    saveFirebase()
    setTitle('')
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="new-task">
          <label htmlFor="task-name-input">Add new task</label><input type="text" id="task-name-input" onKeyDown={handleKeyDown} onChange={e => setTitle(e.target.value)} value={title} />
          <button onClick={saveFirebase}>SAVE</button>
          <p>{title}</p>
        </div>
        <div className="tasks-wrapper">
          <h3>Tasks</h3>
          <ol className="tasklist">{listTasks}</ol>
        </div>
        <div className="task-log">
          <ol className="loglist">{listActivities}</ol>
        </div>
      </div>
    </div>
  );
}

export default App;
