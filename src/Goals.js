import React, { useState, useEffect } from 'react';
import './App.css';

function Goals({ Api }) {
    const [goals, setGoals] = useState([]);
    const [prevGoals, setPrevGoals] = useState([]);
    const [title, setTitle] = useState('');
    const [parent, setParent] = useState('');
    const [addMode, setAddMode] = useState(false);


    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    
    useEffect(() => {
        //if (!db.collection) return

        

        Api.subscribeGoals(g => {
            console.log(g)


            let goalss = [{"title": "Book", "id": "xttAJVGlcTDK4AfwKqGu", "mark": "10", "date": "Thu Apr 01 2021"}, {"date": "Thu Apr 01 2021", "id": "xbluuXEVFPY8Sq0u5aUI", "title": "Alcohol Abstinency", "parent": "Food", "mark": 5}, {"id": "vlMiMPoyddX2Lh5ksMEY", "parent": "Education", "title": "Tech Course", "date": "Thu Apr 01 2021", "mark": 5}, {"date": "Thu Apr 01 2021", "mark": 5, "title": "Tech Podcast", "id": "sQsLSnVr3q65eLQeFoU4", "parent": "Education"}, {"parent": "Accountability", "id": "n8mOJxLfc4CvqzMzvb27", "mark": 5, "title": "TODOs", "date": "Thu Apr 01 2021"}, {"mark": "7", "parent": "Education", "id": "n3bhWARaCQKy3ka271kd", "date": "Thu Apr 01 2021", "title": "MOOC"}, {"title": "Journal", "parent": "Accountability", "mark": 5, "date": "Thu Apr 01 2021", "id": "j2seI5rb4KgLMuTLye6H"}, {"mark": 5, "title": "Mindfulness", "date": "Thu Apr 01 2021", "id": "gpilpBMgn76m0Hmbe20F"}, {"date": "Thu Apr 01 2021", "mark": 5, "parent": "Education", "title": "Podcast", "id": "dDSYkmFbJ7n0WEOUp6JS"}, {"mark": 5, "title": "Yoga", "parent": "Mindfulness", "date": "Thu Apr 01 2021", "id": "d4qL44CPVxpU3JaQWeSn"}, {"mark": 5, "date": "Thu Apr 01 2021", "id": "azAJAgtDWr50T27CsvH5", "title": "Health/Body"}, {"mark": 5, "date": "Thu Apr 01 2021", "title": "Professional", "id": "WrNK333a6lOnUPp7aDDh"}, {"id": "Pm1oSaHnoyodK0SKPzgq", "parent": "Memory+Focus", "date": "Thu Apr 01 2021", "title": "Memory", "mark": 5}, {"date": "Thu Apr 01 2021", "parent": "Food", "mark": 5, "title": "Supplements", "id": "PVlWBDRZSdYlST1lFPZK"}, {"parent": "Accountability", "id": "OHUGe3zB3CO3ZKfQ3wZU", "date": "Thu Apr 01 2021", "title": "Review/Planning", "mark": 5}, {"title": "Fasting", "mark": 5, "parent": "Food", "id": "OFZYc1aF2G24kyf89DtU", "date": "Thu Apr 01 2021"}, {"mark": 5, "date": "Thu Apr 01 2021", "id": "MmeJCQ96LrnUur90jWgp", "title": "Accountability"}, {"mark": 5, "id": "Irs0vJfJfXZLgPJeNqKN", "title": "Healthy Eating", "date": "Thu Apr 01 2021", "parent": "Food"}, {"id": "IaChLvkra8Xva1LuaD3X", "date": "Thu Apr 01 2021", "title": "Food", "mark": 5}, {"mark": "8", "title": "Education", "id": "GPj4m0tsZJ379D0RyKIW", "date": "Thu Apr 01 2021"}, {"mark": "8", "id": "DVh5y0NyLMUexTGDKUpi", "date": "Thu Apr 01 2021", "title": "Philosophy", "parent": "Education"}, {"mark": 5, "title": "Active Learning (Anki, Notes)", "id": "DSD03PvKjTZQN3umblQW", "date": "Thu Apr 01 2021", "parent": "Memory+Focus"}, {"date": "Thu Apr 01 2021", "mark": 5, "title": "Meditation", "id": "CnHOUBQEhBrAD0GItoiA", "parent": "Mindfulness"}, {"mark": 5, "parent": "Health/Body", "date": "Thu Apr 01 2021", "title": "Stretching", "id": "7K0cvh50FlXrmCX9ecDX"}, {"date": "Thu Apr 01 2021", "mark": 5, "title": "Sleep", "id": "6Fq5WcRm4UZZLxoryCNc"}, {"title": "Cold Shower", "id": "4AL7gEoiPmvAO5CajzIJ", "parent": "Health/Body", "date": "Thu Apr 01 2021", "mark": 5}, {"date": "Thu Apr 01 2021", "mark": 5, "title": "Memory+Focus", "id": "3waLSLXgs2heVQvgdmGy"}, {"title": "Audiobooks", "id": "0cLhYnJAYtr3MViDFS5m", "mark": 5, "date": "Thu Apr 01 2021"}, {"title": "Exercise", "mark": 5, "date": "Thu Apr 01 2021", "parent": "Health/Body", "id": "0JE8xzidoV7V5prYTDYD"}, {"date": "Fri Apr 02 2021", "id": "zd4VEeJTpngnzy5Dqthl", "mark": "3", "title": "Professional"}, {"title": "Philosophy", "id": "wdtHVTETo4fDoLS48jPO", "date": "Fri Apr 02 2021", "parent": "Education", "mark": "8"}, {"title": "Memory+Focus", "mark": "7", "date": "Fri Apr 02 2021", "id": "w3MoVErvKFYcJorrgbwD"}, {"mark": "9", "date": "Fri Apr 02 2021", "id": "ufEyTXsDD4zb9Y9fvfNY", "parent": "Food", "title": "Alcohol Abstinency"}, {"title": "Supplements", "parent": "Food", "date": "Fri Apr 02 2021", "id": "sol2Uk4SQ1BCQpUkOASL", "mark": "9"}, {"mark": "7", "title": "Stretching", "date": "Fri Apr 02 2021", "id": "q69bP5KXAzkNbvX0pUdm", "parent": "Health/Body"}, {"date": "Fri Apr 02 2021", "id": "od6cwxpNAVJNJiLZ0nhX", "mark": "9", "title": "Education"}, {"mark": "5", "date": "Fri Apr 02 2021", "title": "Journal", "parent": "Accountability", "id": "jhrnh9HjtI9lgE7PqE9l"}, {"id": "jCUCYey8MmU5eW8EpTDE", "mark": 5, "title": "Exercise", "parent": "Health/Body", "date": "Fri Apr 02 2021"}, {"date": "Fri Apr 02 2021", "id": "fQhljrDTYrzldeAhUDFT", "title": "Accountability", "mark": 5}, {"date": "Fri Apr 02 2021", "mark": "6", "id": "fCpOyeSmS4BSdayucYBX", "title": "Book"}, {"date": "Fri Apr 02 2021", "mark": "8", "id": "crzFURNDsg3uGQfXuiGC", "parent": "Education", "title": "Podcast"}, {"mark": "6", "parent": "Memory+Focus", "date": "Fri Apr 02 2021", "id": "XDRMcpOn21r4A1lwXLuR", "title": "Active Learning (Anki, Notes)"}, {"id": "VmkY7aCN4t6wg21a6m7n", "mark": "8", "date": "Fri Apr 02 2021", "title": "Tech Podcast", "parent": "Education"}, {"title": "Audiobooks", "mark": "9", "date": "Fri Apr 02 2021", "id": "TNkcYEWm91ljfTOSgozY"}, {"mark": "6", "date": "Fri Apr 02 2021", "id": "SZyhH69K080T7wHFyR0j", "title": "Health/Body"}, {"id": "R1BknxEefuiCUMBao0sN", "date": "Fri Apr 02 2021", "title": "Food", "mark": "8"}, {"title": "Yoga", "id": "PpqN1FJimUF6CvcDfCzd", "mark": "5", "parent": "Mindfulness", "date": "Fri Apr 02 2021"}, {"id": "PfijoKJLFmidn1OWqwzQ", "parent": "Food", "date": "Fri Apr 02 2021", "mark": "7", "title": "Healthy Eating"}, {"id": "GTnyFEClDwas8807GvvU", "date": "Fri Apr 02 2021", "parent": "Accountability", "title": "Review/Planning", "mark": 5}, {"id": "9Xyl8EEHpkkQfOc4mSaE", "mark": "3", "parent": "Accountability", "date": "Fri Apr 02 2021", "title": "TODOs"}, {"parent": "Mindfulness", "title": "Meditation", "mark": "5", "date": "Fri Apr 02 2021", "id": "9PEf2vD6YcORFuEQp85m"}, {"id": "7kXhD7ZJJuJB71hbQj5D", "date": "Fri Apr 02 2021", "mark": "4", "title": "Sleep"}, {"id": "7hKR5XhT3Xk1bfoHawnp", "mark": "8", "parent": "Education", "title": "MOOC", "date": "Fri Apr 02 2021"}, {"date": "Fri Apr 02 2021", "title": "Mindfulness", "mark": "6", "id": "7RhEujXF2GpySchKaagt"}, {"title": "Tech Course", "mark": "7", "id": "6qWsM8hFDNCEWSFTFLw3", "date": "Fri Apr 02 2021", "parent": "Education"}, {"id": "5CyitOvzVPuy0mxK54al", "parent": "Memory+Focus", "mark": "7", "date": "Fri Apr 02 2021", "title": "Memory"}, {"date": "Fri Apr 02 2021", "parent": "Health/Body", "id": "4c3laxMvdKDQ4HCqniEk", "mark": "2", "title": "Cold Shower"}, {"mark": "8", "parent": "Food", "date": "Fri Apr 02 2021", "title": "Fasting", "id": "4EuhX44gsynYYnJUATHg"}];

            goals.forEach(async (gts) => {
                const goal = gts
                await Api.addGoal(goal)
            })


            const first = g[0]?.date

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
