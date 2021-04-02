import React, { useState, useEffect } from 'react';
import './App.css';

function Goals({ Api }) {
    const [goals, setGoals] = useState([]);
    const [prevGoals, setPrevGoals] = useState([]);
    const [title, setTitle] = useState('');
    const [parent, setParent] = useState('');
    const [addMode, setAddMode] = useState(false);


    useEffect(() => {
        //if (!db.collection) return

        Api.subscribeGoals(g => {
            console.log(g)


            const first = g[0].date

            var d = new Date(first);
            d.setDate(d.getDate() - 1)
            const nowDate = d.toDateString()

            console.log(nowDate)

            const prev = g.filter(goal => goal.date === nowDate)

            setGoals(_ => g.map(go => {
                if (go.parent == undefined) go.parent = ''
                return go
            }).sort(dynamicSort('parent')))
            setPrevGoals(_ => prev)

            console.log(prev)


        })
    }, []);


    const addGoal = () => {
        // const tosave = [
        //     'Active Learning (Anki, Notes)',
        //     'Memory',
        // ]

        // const goalstosave = tosave.map(title => {
        //     return {
        //         title,
        //         date: new Date(Date.now()),
        //         mark: 5,
        //         parent: 'Memory+Focus'
        //     }
        // })

        // goalstosave.forEach(gts => Api.addGoal(gts))

        const goal = {
            title,
            date: new Date(Date.now()),
            mark: 5,
        }
        if (parent !== '') goal.parent = parent
        Api.addGoal(goal)
        setParent('')
        setTitle('')
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }


    const goalsList = goals.length > 0 ? goals.filter(goal => goal.date === goals[0]?.date)
        .sort(dynamicSort('parent'))
        .map((goal, id) =>
        (<li key={id}>
            {prevGoals.find(g => g.title === goal.title)?.mark} - {prevGoals.find(g => g.title === goal.title)?.date}
            <input min="0" max="10"
                style={{ width: '30px' }}
                type="number"
                value={goal.mark} onChange={e => Api.updateGoalMark(goal.id, e.target.value)} />
         ====  {goal.date} --  {goal?.parent ? goal.parent + '---> ' : ''} {goal.title}
        </li>)) : ''

    const addNewGoalRewiew = async () => {
        var d = new Date();
        d.setDate(d.getDate());

        const datetimenow = d
        const nowDate = d.toDateString()

        const alreadyReviewedToday = goals.some(g => g.date === nowDate)
        if (alreadyReviewedToday) return

        const allGoals = await Api.getAllGoals()

        const first = allGoals[0]
        const date = first.date
        const lastGoals = allGoals.filter(goal => goal.date === date)

        lastGoals.forEach(gts => {
            const goal = gts
            goal.date = nowDate
            goal.datetime = datetimenow
            Api.addGoal(goal)
        })
    }

    return (
        <div className="">
            {addMode && <div className="add-goal">
                <label htmlFor="goal-name-input">Add new Goal</label>
                <input type="text" id="goal-name-input" onChange={e => setTitle(e.target.value)} value={title} />
                <label htmlFor="goal-parent-input">Parent</label>
                <input type="text" id="goal-parent-input" onChange={e => setParent(e.target.value)} value={parent} />
                <button onClick={e => addGoal()} className="btn-main">add</button>
            </div>}
            <button onClick={e => setAddMode(old => !old)} className="btn-main">{addMode ? 'Hide' : 'Add New Goal'}</button>
            <ul>
                {goalsList}
            </ul>

            {/* <button onClick={e => addBulk()} className="btn-main">TEST</button> */}
            <button onClick={e => addNewGoalRewiew()} className="btn-main">ADD REVIEW</button>

        </div>
    )

}

export default Goals;
