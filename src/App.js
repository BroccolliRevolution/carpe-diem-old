import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import firebase from 'firebase'
import firebaseConfig from './config/firebase-config'

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore();

/*
var provider = new firebase.auth.GoogleAuthProvider();
 provider.addScope('profile');
 provider.addScope('email');
 provider.addScope('https://www.googleapis.com/auth/plus.me');
 firebase.auth().signInWithPopup(provider); // Opens a popup window and returns a promise to handle errors.

 firebase.auth().onAuthStateChanged(function(user) {
  window.user = user; // user is undefined if no user signed in
 });

 */


function App() {
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState([]);   // TODO get rid of entries - no more used
  const [dailies, setDailies] = useState([]);
  const [habits, setHabits] = useState([]);
  const [chores, setChores] = useState([]);
  const [activities, setActivities] = useState([]);
  const [auth, setAuth] = useState('ok');

 
  const setTasksByType = type => {
    db.collection("tasks").where("type", "==", type).orderBy("order")
      .onSnapshot(function (querySnapshot) {
        var tasks = []
        querySnapshot.forEach(doc =>
          tasks.push({
            id: doc.id,
            title: doc.data().title,
            type: doc.data().type
          })
        )

        if (type === 'habits') setHabits(items => [...tasks])
        if (type === 'chores') setChores(items => [...tasks])
        if (type === 'dailies') setDailies(items => [...tasks])
      })
  }

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
            datetime: datetimeStr
          })

        })
        setActivities(items => [...activities])

        // console.log(activities.map(({task}) => task))
        // const todaysActivities = activities.map(({task}) => task)

        // setDailies(dailies => dailies.filter(daily => !todaysActivities.includes(daily)))
      
        // db.collection("tasks")
        // .where("type", "==", 'dailies')
        // .where(firebase.firestore.FieldPath.documentId(), 'in', todaysActivities)
        // //.orderBy("order")
        // .onSnapshot(function (querySnapshot) {
        //   var tasks = []
        //   querySnapshot.forEach(doc =>
        //     tasks.push({
        //       id: doc.id,
        //       title: doc.data().title,
        //       type: doc.data().type
        //     })
        //   )
        //   setDailies(items => [...tasks])
        // })


        

      })


// TODO THIS ONE???


      // db.collection("tasks").where("type", "==", type).orderBy("order")
      // .onSnapshot(function (querySnapshot) {
      //   var tasks = []
      //   querySnapshot.forEach(doc =>
      //     tasks.push({
      //       id: doc.id,
      //       title: doc.data().title,
      //       type: doc.data().type
      //     })
      //   )

      //   if (type === 'habits') setHabits(items => [...tasks])
      //   if (type === 'chores') setChores(items => [...tasks])
      //   if (type === 'dailies') setDailies(items => [...tasks])
      // })

      // Grab them all at once and sort them via reduce
      setTasksByType('habits')
      setTasksByType('chores')
      setTasksByType('dailies')
  }

  const getAuth = () => {
    
    firebase.auth().onAuthStateChanged(function(user) {
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
  }, []);



  const updateFirebase = e => {

    const dailies = [
      'Tibetans',
      'Journal',
      'Exercise',
      'Tech Podcast',
      'Yoga',
      'Meditation',
      'Book',
      'Medium',
      'Duolingo',
      'Elevate',
      'Audiobook',
      'Cardio',
      'MOOC',
      'Tech Course',
      'Podcast',
      'Stretches',
    ]

    
    // or maybe auxiliary? or hobbies?
    const habits = [
      'Project',
      'Computerphile',
      'Art',
      'CuriosityStream',
      'Science Festival',
      'Firebase Tutorial',
      'Cheery Friday',
      'Leisure',
      'Other Education',
      'FOOD',
      'NAP',
    ]
    
    const chores = [
      'Chores',
      'TODOs',
      'Bookmarks, Articles',
      'Cleanup Tabs, Papers',
      'Review',
      'Books Notes',
      'Idea Map',
      'Musings',
    ]

    const tasksToUpdate = [
      'Tibetans',
      'Journal',
      'Exercise',
      'Yoga',
      'Book',
      'Medium',
      'Duolingo',
      'Elevate',
      'Tech Podcast',
      'Audiobook',
      'MOOC',
      'Tech Course',
      'Stretches',
      'Cardio',
      'Meditation',
      'Podcast',
      
      'Project',
      'Computerphile',
      'Art',
      'CuriosityStream',
      'Science Festival',
      'Firebase Tutorial',
      'Cheery Friday',
      'Leisure',
      'Other Education',
      'FOOD',
      'NAP',
      
      'Chores',
      'Musings',
      'TODOs',
      'Bookmarks, Articles',
      'Cleanup Tabs, Papers',
      'Review',
      'Books Notes',
      'Idea Map',
      ]

      const getType = taskId => {
        if (dailies.includes(taskId)) return 'dailies'
        if (habits.includes(taskId)) return 'habits'
        if (chores.includes(taskId)) return 'chores'
      }

      tasksToUpdate.forEach((taskId, id) => {

        const type = getType(taskId);
        console.log(type, taskId)
        
        
        db.collection("tasks").doc(taskId).set({
          order: id,
          importance: 100,
          level: 1,
          categories: ['health', 'sport'],
          isDaily: true,
          type
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

      })

    
  }

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


  const getTaskList = tasks => tasks.map(({ id, type }) =>
    {
      return (
        <li key={id}>
          <button onClick={e => checkActivity(id)}>SAVE</button>
          {id} - {type}
        </li>
      )
    }
  )

  const getDailies = () => {
        const todaysActivities = activities.map(({task}) => task)

        //setDailies(dailies => dailies.filter(daily => !todaysActivities.includes(daily)))


        const dailiesToRender = dailies.filter(({id}) => !todaysActivities.includes(id))
        console.log(dailiesToRender)
        
        return (
          dailiesToRender.map(({ id, type }) =>
          {
            return (
              <li key={id}>
                <button onClick={e => checkActivity(id)}>SAVE</button>
                {id} - {type}
              </li>
            )
          }
        )
      )
        return 'TO BE RENDERED'
  }

  const listTasks = () => {
    // let tasksByType = entries.reduce((prev, curr) => {
    //   if (!prev[curr.type]) prev[curr.type] = []
    //   prev[curr.type] = [...prev[curr.type], curr]
    //   return prev
    // }, {})
    
    //console.log(getTaskList(tasksByType['dailies']))
    
    //console.log(tasksByType['dailies'], tasksByType)
    
    return (
      <div className="all-tasks">
        <ol className="dailies">
          {getDailies()}
        </ol>
        
        <ol className="habits">
          {getTaskList(habits)}
        </ol>
        
        <ol className="chores">
          {getTaskList(chores)}
        </ol>
        
      </div>
    )
    
    // return (
    //   <div className="tasks-by-type">
    //     <h3>Dailies</h3>
    //     <ul></ul>
    //     <h3>Habbits</h3>
    //     <ul></ul>
    //     <h3>Chores</h3>
    //     <ul></ul>
    //   </div>
    // )
  }
  

  const updateGrade = (activityId, grade) => {
    console.log(activityId)
    var activityRef = db.collection('activities').doc(activityId);

  
    return activityRef.update({
        grade
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }

  const listActivities = activities.map(({ task, id, timestamp, datetime, grade }) =>
    <li key={id}>
      {task} - {datetime}
      <button className="grade-btn" disabled={grade == 100} onClick={() => updateGrade(id, 100)}>just</button>
      <button className="grade-btn" disabled={grade == 200} onClick={() => updateGrade(id, 200)}>ok</button>
      <button className="grade-btn" disabled={grade == 300} onClick={() => updateGrade(id, 300)}>great</button>
      
      <button className="grade-btn" onClick={() => checkActivity(task)}>REPEAT</button>

    </li>
  );


  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') return
    saveFirebase()
    setTitle('')
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

  return (
    auth === 'yep' && <div className="App">

      <h1>this is the auth: {auth}</h1>
      <div className="super-wrapper" onKeyDown={onKeyPressed} tabIndex="0">
        <div className="wrapper">
  {/* 
        <div 
      className="player"
      style={{ position: "absolute", width: '200px', height: '100px', background: 'yellow' }}
      onKeyDown={onKeyPressed}
      tabIndex="0"
    ></div> */}

          
          <div className="tasks-wrapper">
            <h3>Tasks</h3>
            <div className="tasklist">
              {listTasks()}
            </div>
          </div>
          <div className="task-log">
            <h3>Recent activity</h3>
            <ol className="loglist">{listActivities}</ol>
          </div>
          <div className="new-task">
            <label htmlFor="task-name-input">Add new task</label>
            <input type="text" id="task-name-input" onKeyDown={handleKeyDown} onChange={e => setTitle(e.target.value)} value={title} />
            <button onClick={saveFirebase}>SAVE</button>
            <button onClick={updateFirebase}>RUNME</button>
            <p>{title}</p>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
