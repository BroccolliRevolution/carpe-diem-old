import React, { useState, useEffect } from 'react';
import './App.css';

function Goals({ Api }) {
    const [goals, setGoals] = useState([]);


    useEffect(() => {
        //if (!db.collection) return

        Api.subscribeGoals(g => {
            console.log(g)

            setGoals(_ => g)
        })
    }, []);


    const addGoal = () => {
        const tosave = [
            'Active Learning (Anki, Notes)',
            'Memory',
        ]

        const goalstosave = tosave.map(title => {
            return {
                title,
                date: new Date(Date.now()),
                mark: 5,
                parent: 'Memory+Focus'
            }
        })

        goalstosave.forEach(gts => Api.addGoal(gts))
    }

    const goalsList = goals.length > 0 ? goals.map((goal, id) =>
    (<li key={id}>
        <input min="0" max="10" 
        style={{width:'30px'}} 
        type="number" 
        value={goal.mark} onChange={e => Api.updateGoalMark(goal.id, e.target.value)}/>
         ====  {goal?.parent} -- {goal.title}
    </li>)) : ''

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
