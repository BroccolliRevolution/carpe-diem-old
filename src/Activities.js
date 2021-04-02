import React, { useState, useEffect } from 'react';
import './App.css';
import { BsArrowRepeat, BsTrophy } from 'react-icons/bs';


const Activities = (activities, tasks, db) => {
  const [timeSinceLastActivity, setTimeSinceLastActivity] = useState(0);
  useEffect(() => {


    return () => '';
  }, [activities]);


  const getActivityReward = (task) => {
    const randVar = Math.floor(Math.random() * 9) + 1
    let randConst = 1
    if (randVar < 3) {
      randConst = 0
    }

    if (randVar > 8) {
      randConst = 2
    }

    const importance = tasks.find(({ id }) => id === task)?.importance || 0
    return randConst * importance
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

  const checkActivity = (task) => {

    const project = tasks.find(({ id }) => id === task)?.project || ''

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


  const deleteActivity = id => {
    db.collection('activities').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
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


  const listActivities = activities.map(({ task, id, timestamp, datetime, grade, reward, project }, i) => {
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
  });



  return (
    <React.Fragment>
      <ol className="loglist">{listActivities}</ol>
    </React.Fragment>
  )
}

export default Activities;
