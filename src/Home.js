import React, { useState, useEffect } from 'react';
import './App.css';
import { BsArrowRepeat, BsTrophy } from 'react-icons/bs';
import TimeSince from './TimeSince';


function Home({ Api }) {

    const doneColors = ['#0080001f', ' #008000a3', ' #008000c9', ' #008000']
    const notDoneColor = '#c5a7c736'


    const [marked, setMarked] = useState([]);
    const [dailies, setDailies] = useState([]);
    const [habits, setHabits] = useState([]);
    const [chores, setChores] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activities, setActivities] = useState([]);
    const [todaysReward, setTodaysReward] = useState(0);
    const [todaysScore, setTodaysScore] = useState(0);
    const [todaysActivitiesCount, setTodaysActivitiesCount] = useState(0);
    const [dateOffset, setDateOffset] = useState(0);
    const [excellenceReward, setExcellenceReward] = useState(0);


    const [dailiesType, setDailiesType] = useState('All');
    const [showEditOrder, setShowEditOrder] = useState(false);

    const getDailiesByType = () => dailiesType === 'All' ? getDailies() : getTaskList(dailies, showEditOrder)
    const onShowEditOrder = () => setShowEditOrder(!showEditOrder)


    const updateTasks = (updateFn) => {
        const update = tasks => {
            let tasksByType = tasks.reduce((prev, curr) => {
                if (!prev[curr.type]) prev[curr.type] = []
                prev[curr.type] = [...prev[curr.type], curr]
                return prev
            }, {})
            const { dailies, habits, chores, hobbies } = tasksByType

            setDailies(items => [...dailies])
            setHabits(items => [...habits])
            setChores(items => [...chores])
            setHobbies(items => [...hobbies])
            setTasks(items => tasks)
        }

        updateFn(update)

    }

    const updateActivitiesAndRewards = (updateFn) => {
        const update = (activities) => {
            setActivities(items => [...activities])
            const rewards = activities.map(activity => activity?.reward || 0)
            //setTodaysReward(rewards.reduce((prev, curr) => prev + curr, 0))
        }
        updateFn(update, dateOffset)
    }

    const updateDailyPerformance = (updateFn) => {
        const update = (perf) => {
            setTodaysReward(_ => perf?.reward || 0)
            setTodaysScore(_ => perf?.score || 0)
            setTodaysActivitiesCount(_ => perf?.activitiesCount || 0)
        }
        updateFn(update)
    }

    const subscribeFirebase = () => {
        updateActivitiesAndRewards(Api.subscribeActivities)
        updateTasks(Api.subscribeTasks)
        updateDailyPerformance(Api.getDailyPerformance)
    }

    useEffect(() => {
        subscribeFirebase()
        const storedMarked = JSON.parse(localStorage.getItem('marked'))
        if (storedMarked) setMarked(storedMarked)
    }, []);

    useEffect(
        () => {
            localStorage.setItem('marked', JSON.stringify(marked))
        }, [activities]
    )

    const getTaskList = (tasks, showEditOrder) => tasks.map((task) => {
        const { id, type, newSection, title, importance } = task

        const markTask = ({ id }) => {
            if (marked.includes(id)) {
                const newMarked = marked.filter(m => m != id)
                setMarked(newMarked)
                return
            }

            setMarked([...marked, id])
        }

        const getColorByCountDone = ({ id }) => {
            const count = activities.filter(({ task }) => task == id).length

            if (count === 1) return { backgroundColor: doneColors[0] }
            if (count === 2) return { backgroundColor: doneColors[1] }
            if (count === 3) return { backgroundColor: doneColors[2], color: 'white' }
            if (count > 3) return { backgroundColor: doneColors[3], color: 'white' }

            return { backgroundColor: notDoneColor, border: '1px solid blue' }
        }


        return (
            <li key={id} className="task" style={{ marginTop: newSection ? "30px" : "0" }}>
                {showEditOrder && <button onClick={e => Api.changeOrder(task, +1)}>🔼</button>}
                {showEditOrder && <button onClick={e => Api.changeOrder(task, -1)}>🔽</button>}
                <button onClick={async e => {
                    const { reward, score } = await Api.checkActivity(id, tasks) || 0
                    Api.updateDailyPerformance(todaysReward + reward, todaysScore + score, activities.length + 1)
                }} className="btn-main" style={getColorByCountDone(task)}>SAVE</button>
                <span className="task-title" onClick={e => markTask(task)}>
                    {title || id}  {marked.includes(id) && '🥦'}{showEditOrder && (' - ' + task.order)}
                </span>
            </li>
        )
    })

    const getDailies = () => {
        const todaysActivities = activities.map(({ task }) => task)
        const dailiesFilteredSorted = dailies
            .filter(({ id }) => !todaysActivities.includes(id))
            .sort((a, b) => a.order - b.order)
        const dailiesToRender = dailiesFilteredSorted.map((daily, i) => {
            const nextDaily = dailiesFilteredSorted[i - 1] || 0
            if (nextDaily.partOfDay !== daily.partOfDay)
                return { newSection: true, ...daily }
            return daily

        })

        return getTaskList(dailiesToRender)
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
    

    const listActivities = activities.map(({ task, id, timestamp, datetime, grade, reward, score, project }, i) => {
        return (
            <li key={id} className="activity-item">

                <div className="activity-text-section">
                    <button className="grade-btn repeat-btn" onClick={async () => {
                        const { reward, score } = await Api.checkActivity(task, tasks)
                        Api.updateDailyPerformance(todaysReward + reward, todaysScore + score, activities.length)
                    }
                    }>
                        <BsArrowRepeat style={{ width: '20px', height: '20px' }} />

                    </button>
                    {task} - {datetime}
                </div>
                <div className="activity-btns-section">

                    <button className="grade-btn" disabled={grade == 100} onClick={() => Api.updateGrade(id, 100)}>just</button>
                    <button className="grade-btn" disabled={grade == 200} onClick={() => Api.updateGrade(id, 200)}>ok</button>
                    <button className="grade-btn" disabled={grade == 300} onClick={() => Api.updateGrade(id, 300)}>great</button>
                    {timeSincePreviousActivityByIndex(timestamp, i)}
                    <button className="grade-btn" onClick={() => {
                        Api.deleteActivity(id)
                        Api.updateDailyPerformance(todaysReward - reward, todaysScore - score, activities.length)
                    }}>x</button>

         ----->{reward}/{score}
                    {/* .... {project} */}
                </div>

            </li>
        )
    });

    const onReset = () => {
        setMarked([])
    }

    const getRandReward = () => {
        const randVar = Math.floor(Math.random() * 9) + 1
        let randConst = 1
        if (randVar < 3) {
            randConst = 0
        }

        if (randVar > 7) {
            randConst = 2
        }

        const importance = 100
        return randConst * importance
    }

    return (
        <div className="super-wrapper" tabIndex="0">
            <button className="reset-btn" onClick={e => onReset()}>Reset</button>
            <button className="reset-btn" onClick={e => onShowEditOrder()}>Show Order</button>
            <div className="wrapper">
                <div className="tasks-wrapper">
                    <div className="tasklist">
                        <div className="all-tasks">

                            <h3 className="main-sections-header">All Dailies</h3>
                            <ol className="habits">
                                {getTaskList(dailies, showEditOrder)}
                            </ol>

                            <h3 className="main-sections-header">Habits</h3>
                            <ol className="habits">
                                {getTaskList(habits, showEditOrder)}
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="dailies-list">

                    <h3 className="main-sections-header">
                        Dailies <button onClick={e => setDailiesType(() => dailiesType === 'Left' ? 'All' : 'Left')}>{dailiesType}</button>
                        {getDailiesByType().length === 0 && <div className="all-done">
                            <div className="all-done-text">ALL DONE for today!!!</div>
                            <span>✔️✔️✔️</span></div>}
                    </h3>

                    <ol className="dailies">
                        {getDailiesByType()}
                    </ol>


                    <h3 className="main-sections-header">Hobbies</h3>
                    <ol className="habits">
                        {getTaskList(hobbies, showEditOrder)}
                    </ol>


                    <h3 className="main-sections-header">Chores</h3>
                    <ol className="chores">
                        {getTaskList(chores, showEditOrder)}
                    </ol>
                </div>
                <div className="task-log">
                    <div className="time-since-wrapper">
                        <TimeSince activities={activities} />
                    </div>
                    <div className="reward">
                    Today's reward: <span className="todays-reward">{todaysReward} </span>,- ({todaysActivitiesCount} activities) 
                        <BsTrophy style={{ color: '#F0E68C', width: '40px', height: '40px' }}></BsTrophy>
                        score: {todaysScore}
                        <button className="excellence-button" onClick={() => {
                            const newExcellenceReward = getRandReward()
                            const newReward = todaysReward + newExcellenceReward
                            setExcellenceReward(newExcellenceReward)
                            setTimeout(_ => setExcellenceReward(0), 4000)
                            Api.updateDailyPerformance(newReward, todaysScore, activities.length)
                        }}>EXCELLENCE</button> {excellenceReward ? '+' : ''} {excellenceReward || ''}
                    </div>
                    <ol className="loglist">
                        {listActivities}
                        {/* <Activities activities = {activities} db={db} tasks={tasks}></Activities> */}
                    </ol>
                    <button className="" style={{ 'paddingLeft': '50px', 'paddingRight': '50px', 'marginLeft': '50px' }} onClick={() => {
                        let newDate = dateOffset + 1
                        setDateOffset(prev => newDate)
                        updateActivitiesAndRewards(Api.subscribeActivities)
                    }}>more ... </button>

                </div>
            </div>
        </div>
    )
}

export default Home;
