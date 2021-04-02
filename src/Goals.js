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

            setGoals(_ => g)
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


    const goalsList = goals.length > 0 ? goals.filter(goal => goal.date === goals[0]?.date).map((goal, id) =>
    (<li key={id}>
        {prevGoals.find(g => g.title === goal.title)?.mark} - {prevGoals.find(g => g.title === goal.title)?.date}
        <input min="0" max="10"
            style={{ width: '30px' }}
            type="number"
            value={goal.mark} onChange={e => Api.updateGoalMark(goal.id, e.target.value)} />
         ====  {goal.date} --  {goal?.parent} -- {goal.title}
    </li>)) : ''



    const addBulk = async () => {


        // console.log(new Date(Date.now()))


        // // const tt = [
        // //     {
        // //         "id": "A1XYJnYrKmUYE065WNYu",
        // //         "date": {
        // //             "seconds": 1617109043,
        // //             "nanoseconds": 0
        // //         },
        // //         "mark": 5,
        // //         "title": "das",
        // //         "parent": "scad"
        // //     },
        // //     {
        // //         "id": "18OLqRfMfYkZAoSyw7en",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 10,
        // //         "title": "Book"
        // //     },
        // //     {
        // //         "id": "7E3dvvxxcwkr16sdcSEO",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": "8",
        // //         "title": "Education"
        // //     },
        // //     {
        // //         "id": "GvMudkDXSwj30ZshCBeg",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Mindfulness"
        // //     },
        // //     {
        // //         "id": "VtInJIweOeeVb3vEXePY",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Audiobooks"
        // //     },
        // //     {
        // //         "id": "VxQEg0q9EimGosdrO5jT",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Professional"
        // //     },
        // //     {
        // //         "id": "WpM3O2hI1aDJ3OZBPDxT",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Health/Body"
        // //     },
        // //     {
        // //         "id": "XzGBL092IvjZTcKuELzF",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Sleep"
        // //     },
        // //     {
        // //         "id": "kd3HoBNnbOXI0tvowN8j",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Accountability"
        // //     },
        // //     {
        // //         "id": "lUMUJO1vjv1r3g9XV3lV",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Memory+Focus"
        // //     },
        // //     {
        // //         "id": "rDzOG8YCBrEjwc4KypEj",
        // //         "date": {
        // //             "seconds": 1617295069,
        // //             "nanoseconds": 457000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Food"
        // //     },
        // //     {
        // //         "id": "ODXT7cgF9BAc1odGKw4H",
        // //         "date": {
        // //             "seconds": 1617295807,
        // //             "nanoseconds": 903000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Meditation",
        // //         "parent": "Mindfulness"
        // //     },
        // //     {
        // //         "id": "i8cGc8YvxO479ZwAbxOc",
        // //         "date": {
        // //             "seconds": 1617295807,
        // //             "nanoseconds": 903000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Yoga",
        // //         "parent": "Mindfulness"
        // //     },
        // //     {
        // //         "id": "BMkM6sDW86dh08pyiAjX",
        // //         "date": {
        // //             "seconds": 1617295941,
        // //             "nanoseconds": 447000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Journal",
        // //         "parent": "Accountability"
        // //     },
        // //     {
        // //         "id": "YzMjtIi2ySTvZWim1mVl",
        // //         "date": {
        // //             "seconds": 1617295941,
        // //             "nanoseconds": 447000000
        // //         },
        // //         "mark": 5,
        // //         "title": "TODOs",
        // //         "parent": "Accountability"
        // //     },
        // //     {
        // //         "id": "rI8eFLGMksttQpfkuhX3",
        // //         "date": {
        // //             "seconds": 1617295941,
        // //             "nanoseconds": 447000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Review/Planning",
        // //         "parent": "Accountability"
        // //     },
        // //     {
        // //         "id": "50CfgWcl5sWGdUT8Hqb2",
        // //         "date": {
        // //             "seconds": 1617296090,
        // //             "nanoseconds": 307000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Stretching",
        // //         "parent": "Health/Body"
        // //     },
        // //     {
        // //         "id": "TyeETFXWaYjfDae4DMSw",
        // //         "date": {
        // //             "seconds": 1617296090,
        // //             "nanoseconds": 307000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Cold Shower",
        // //         "parent": "Health/Body"
        // //     },
        // //     {
        // //         "id": "b5N9ExfumPDw4OmWL3wm",
        // //         "date": {
        // //             "seconds": 1617296090,
        // //             "nanoseconds": 307000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Exercise",
        // //         "parent": "Health/Body"
        // //     },
        // //     {
        // //         "id": "1NZN0FODLtSEbZBUGx6O",
        // //         "date": {
        // //             "seconds": 1617296188,
        // //             "nanoseconds": 393000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Fasting",
        // //         "parent": "Food"
        // //     },
        // //     {
        // //         "id": "9aYEyujsxhKXIXJmEjcf",
        // //         "date": {
        // //             "seconds": 1617296188,
        // //             "nanoseconds": 393000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Supplements",
        // //         "parent": "Food"
        // //     },
        // //     {
        // //         "id": "K0rCW9VSTSDcHU3suaC7",
        // //         "date": {
        // //             "seconds": 1617296188,
        // //             "nanoseconds": 393000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Healthy Eating",
        // //         "parent": "Food"
        // //     },
        // //     {
        // //         "id": "Tdf9Ae2Qi7tNif3cF79B",
        // //         "date": {
        // //             "seconds": 1617296188,
        // //             "nanoseconds": 393000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Alcohol Abstinency",
        // //         "parent": "Food"
        // //     },
        // //     {
        // //         "id": "DRdfNNJKeAOJ1ueYreUr",
        // //         "date": {
        // //             "seconds": 1617296284,
        // //             "nanoseconds": 625000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Podcast",
        // //         "parent": "Education"
        // //     },
        // //     {
        // //         "id": "OLQiY00wn3YEYy3rMTVw",
        // //         "date": {
        // //             "seconds": 1617296284,
        // //             "nanoseconds": 625000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Tech Course",
        // //         "parent": "Education"
        // //     },
        // //     {
        // //         "id": "ajFN8haIs9XLPsBsCefA",
        // //         "date": {
        // //             "seconds": 1617296284,
        // //             "nanoseconds": 625000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Philosophy",
        // //         "parent": "Education"
        // //     },
        // //     {
        // //         "id": "lgOrSWz5wYuNXAEV3Lka",
        // //         "date": {
        // //             "seconds": 1617296284,
        // //             "nanoseconds": 625000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Tech Podcast",
        // //         "parent": "Education"
        // //     },
        // //     {
        // //         "id": "oyT9CMlqDhu6apmS45qI",
        // //         "date": {
        // //             "seconds": 1617296284,
        // //             "nanoseconds": 625000000
        // //         },
        // //         "mark": 5,
        // //         "title": "MOOC",
        // //         "parent": "Education"
        // //     },
        // //     {
        // //         "id": "PpzqaFg8DP39pP3YdUD7",
        // //         "date": {
        // //             "seconds": 1617296379,
        // //             "nanoseconds": 426000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Memory",
        // //         "parent": "Memory+Focus"
        // //     },
        // //     {
        // //         "id": "nQoW5FdHXzlMztN7kCUj",
        // //         "date": {
        // //             "seconds": 1617296379,
        // //             "nanoseconds": 426000000
        // //         },
        // //         "mark": 5,
        // //         "title": "Active Learning (Anki, Notes)",
        // //         "parent": "Memory+Focus"
        // //     }
        // // ]


        // var d = new Date();
        // d.setDate(d.getDate() - 1);

        // const datetimenow = d
        // const nowDate = d.toDateString()

        // // const datetimenow = new Date(Date.now())
        // // const nowDate = new Date(Date.now()).toDateString()

        // const ttt = tt.map(el => {
        //     let res =  {title: el.title, date: nowDate, datetime: datetimenow, mark: el.mark}
        //     if (el.parent) res.parent = el.parent
        //     return res
        // })

        // // ttt.forEach(gts => Api.addGoal(gts))
        // console.log(ttt)


        // return


    }


    const addNewGoalRewiew = async () => {


        const allGoals = await Api.getAllGoals()

        const first = allGoals[0]
        const date = first.date


        console.log(date)



        const lastGoals = allGoals.filter(goal => goal.date === date)
        console.log(allGoals)
        console.log(lastGoals)

        return


        var d = new Date();
        d.setDate(d.getDate());

        const datetimenow = d
        const nowDate = d.toDateString()
        lastGoals.forEach(gts => {
            const goal = gts
            goal.date = nowDate
            goal.datetime = datetimenow
            console.log(goal)
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

            <button onClick={e => addBulk()} className="btn-main">TEST</button>
            <button onClick={e => addNewGoalRewiew()} className="btn-main">ADD REVIEW</button>

        </div>
    )

}

export default Goals;
