import React, { useState, useEffect } from 'react';
import './App.css';

const  timeSinceLastActivityFormatted = (diff) => {
  let hours = Math.floor(diff / 3600);
  let totalSeconds = diff % 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  const addNullIfNeeded = (timePart) => {
    return timePart < 10 ? '0' + timePart : timePart
  }

  return `${addNullIfNeeded(hours)}:${addNullIfNeeded(minutes)}:${addNullIfNeeded(Math.floor(seconds))}`
}


const TimeSince = ({ activities }) => {
  const [timeSinceLastActivity, setTimeSinceLastActivity] = useState(0);
  useEffect(() => {

    function updateTimeSinceLastActivity() {
      setTimeSinceLastActivity(time => {

        let miliseconds = (Date.now() - activities[0]?.timestamp)
        let diff = Math.floor(miliseconds / 1000)

        return diff
      })
    }

    const interval = setInterval(() => {
      updateTimeSinceLastActivity()
    }, 1000);
    return () => clearInterval(interval);
  }, [activities]);

  const pomodoroCount = (time) => {
    const pomCount = Math.floor(timeSinceLastActivity / 60 / 25)

    return pomCount < 5 ? pomCount : 0
  }

  return (
    <React.Fragment>
      <div className="time-since-label">
        Time since the last activity/Last time:
            </div>
      <div className="time-since">
        <span>{timeSinceLastActivityFormatted(timeSinceLastActivity)}</span>
        <span> {'🍅'.repeat(pomodoroCount())}</span>
      </div>
    </React.Fragment>
  )
}

export default TimeSince;
