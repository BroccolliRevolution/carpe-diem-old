import React, { useState, useEffect } from 'react';
import './App.css';

function Goals({Api}) {
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
        
        // [
        //     'Mindfulness',
        //     'Accountability',
        //     'Exercise',
        //     'Food',
        //     'Sleep',
        //     'Book',
        //     'Audiobooks',
        //     'Learning',
        //     'Memory+Focus',
        //     'Professional',
        // ]

        

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

    const goalsList = goals.length > 0 ? goals.map((goal, id) => (<li key={id}>{goal?.parent} -- {goal.title}:  {goal.mark}</li>)): ''

    return (
        <div className="">
            
            <ol>
                {goalsList}
            </ol>
            <button onClick={e => addGoal()} className="btn-main">add</button>
        </div>
    )

}

export default Goals;
