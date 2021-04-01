import React, { useState, useEffect } from 'react';
import './App.css';
import { BsArrowRepeat, BsTrophy } from 'react-icons/bs';
import firebase from 'firebase'

function Goals({Api}) {
    const [goals, setGoals] = useState([]);


    useEffect(() => {
        //if (!db.collection) return

       Api.subscribeGoals(g => {
           console.log(g)
           
        setGoals(g => goals)
       })
    }, []);


    const addGoal = () => {
        

        const goal = {
            // id: Date.now(),
            title: 'management',
            //date: new Date(Date.now()),
            mark: 90900
        }
        Api.addGoal(goal)
    }

    const goalsList = goals.length > 0 ? goals.map((goal, id) => (<li key={id}>{goal.id} - {goal.title}</li>)): ''

    return (
        <div className="">
            
            <ul>
                {goalsList}
            </ul>
            <button onClick={e => addGoal()} className="btn-main">add</button>
        </div>
    )

}

export default Goals;
