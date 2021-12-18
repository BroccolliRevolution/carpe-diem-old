import React, { useState, useEffect } from 'react';
import { FaRegSmileBeam, FaExclamationCircle, FaThumbsDown, FaRegGrinHearts } from 'react-icons/fa';
import './App.css';

function Goals({ Api }) {
    const defaultMark = 5
    const nextReviewsToLoadCount = 50

    const [goals, setGoals] = useState([]);
    const [activeGoals, setActiveGoals] = useState([]);
    const [goalsReviews, setGoalsReviews] = useState([]);
    const [previousReviews, setPreviousReviews] = useState([]);
    const [titleOfNew, setTitleOfNew] = useState('');
    const [parentOfNew, setParentOfNew] = useState('');
    const [orderOfNew, setOrderOfNew] = useState(0);
    const [addMode, setAddMode] = useState(false);
    const [reviewsLimit, setReviewsLimit] = useState(nextReviewsToLoadCount);

    useEffect(() => {
        const lastDate = goalsReviews[0]?.date

        const allPrevReviews = goalsReviews.filter(review => review.date !== lastDate)
        const prevReviewDate = allPrevReviews[0]?.date
        const prevReviews = goalsReviews.filter(review => review.date === prevReviewDate)

        setPreviousReviews(prevReviews)
    }, [goalsReviews])

    useEffect(() => {
        Api.subscribeGoalsReviews(goalsReviewsToUpdate => {
            setGoalsReviews(goalsReviewsToUpdate)
        }, reviewsLimit)
    }, [reviewsLimit])

    useEffect(() => {
        const activeGoals = goals.filter(goal => goal.active)
        setActiveGoals(activeGoals)
    }, [goals])

    useEffect(() => {
        Api.subscribeGoals(goals => {

            setGoals(goals)

        })
    }, [])

    const createNewGoal = () => {
        const dateNow = new Date(Date.now()).toDateString()

        const goal = {
            title: titleOfNew,
            dateTimeCreated: dateNow,
            order: orderOfNew,
            active: true,
            parent: null
        }

        if (parentOfNew !== '') goal.parent = parentOfNew
        Api.addGoal(goal)
        setParentOfNew('')
        setTitleOfNew('')
        setOrderOfNew(0)
    }

    const getPrevReview = review => previousReviews.find(r => r.goal == review?.goal)
    const getImprovementStyling = (newReview, prevReview) => {
        if (!newReview || !prevReview) return '#dad53052'
        const difference = newReview?.mark - prevReview?.mark
        let res

        if (difference === 0) return '#dad53052'

        if (difference >= 1) res = '#2f932f33'
        if (difference > 3 && difference < 6) res = '#3ec71be3'
        if (difference >= 6) res = 'gold'


        if (difference <= -1) res = '#ff000047'
        if (difference <= -3) res = '#ff6a00db'
        if (difference <= -5) res = '#ff1800c9'

        return res
    }

    const getLevelOfMarkContent = ({ mark }) => {
        if (mark > 7) return <><FaRegSmileBeam></FaRegSmileBeam><FaRegGrinHearts></FaRegGrinHearts></>
        if (mark < 5) return <><FaExclamationCircle style={{ color: 'red' }}></FaExclamationCircle><FaThumbsDown style={{ marginLeft: '5px' }}></FaThumbsDown></>
    }

    const showDate = (i) => {
        if (i === 0) return ''
        const curr = goalsReviews[i]?.date
        const prev = goalsReviews[i - 1]?.date

        if (curr != prev) return curr
        return ''
    }

    const reviewsList = goalsReviews
        .map((review, i) =>
        (
            <>
                {showDate(i) && <li className='reviews-date' key={i}>{showDate(i)}</li>}
                <li key={review.id}>
                    {getPrevReview(review)?.mark}

                    <input min="0" max="10"
                        style={{ width: '30px', backgroundColor: getImprovementStyling(review, getPrevReview(review)) }}
                        class="review-mark-input"
                        type="number"
                        value={review.mark} onChange={e => Api.updateGoalReviewMark(review, e.target.value)} />
                    = {getLevelOfMarkContent(review)} {review.goal}
                </li>
            </>
        ))

    const goalsList = goals
        .map(goal =>
        (<li key={goal.id}>
            <input
                type="checkbox"
                checked={goal.active}
                onChange={e => Api.updateGoal({ ...goal, active: !goal.active })}
            />
            order:
            <input min="0" max="10000"
                style={{ width: '40px' }}
                type="number"
                value={goal.order}
                onChange={e => Api.updateGoal({ ...goal, order: e.target.value })}
            />
            {goal.title}
            ....
            Parent: {goal.parent}
            <button onClick={e => {
                if (window.confirm('Are you sure you want to DELETE this goal?')) {
                    Api.deleteGoal(goal)
                }
            }}>x</button>
        </li>))

    const activeGoalsList = activeGoals
        .map(goal =>
        (<li key={goal.id}>
            {goal.title}
            {goal.active}
            {goal.parent}
        </li>))

    const addNewGoalRewiew = async () => {

        // TODO add possibility of remove entries
        // TODO also unactive

        const today = new Date(Date.now())
        const yesterdayDatetime = new Date(today)

        yesterdayDatetime.setDate(yesterdayDatetime.getDate())
        const yesterday = yesterdayDatetime.toDateString()

        const lastReviewsDate = goalsReviews[0]?.date
        const previousReviews = goalsReviews.filter(g => {
            return g.date === lastReviewsDate
        })

        for (const goal of activeGoals) {
            const prevRew = previousReviews.find(prev => prev.goal === goal.title)
            const prevReviewMark = prevRew?.mark || defaultMark
            const goalReview = {
                id: `${yesterday} - ${goal.title}`,
                goal: goal.title,
                order: goal.order,
                date: yesterday,
                dateTime: yesterdayDatetime,
                mark: prevReviewMark
            }
            await Api.addGoalReview(goalReview)
        }
    }

    const saveAllOnce = () => {
        return
        // TODO this is just for filling the data
        let goalsToSave = [{ "title": "Book", "id": "xttAJVGlcTDK4AfwKqGu", "mark": "10", "date": "Thu Apr 01 2021" }, { "date": "Thu Apr 01 2021", "id": "xbluuXEVFPY8Sq0u5aUI", "title": "Alcohol Abstinency", "parent": "Food", "mark": 5 }, { "id": "vlMiMPoyddX2Lh5ksMEY", "parent": "Education", "title": "Tech Course", "date": "Thu Apr 01 2021", "mark": 5 }, { "date": "Thu Apr 01 2021", "mark": 5, "title": "Tech Podcast", "id": "sQsLSnVr3q65eLQeFoU4", "parent": "Education" }, { "parent": "Accountability", "id": "n8mOJxLfc4CvqzMzvb27", "mark": 5, "title": "TODOs", "date": "Thu Apr 01 2021" }, { "mark": "7", "parent": "Education", "id": "n3bhWARaCQKy3ka271kd", "date": "Thu Apr 01 2021", "title": "MOOC" }, { "title": "Journal", "parent": "Accountability", "mark": 5, "date": "Thu Apr 01 2021", "id": "j2seI5rb4KgLMuTLye6H" }, { "mark": 5, "title": "Mindfulness", "date": "Thu Apr 01 2021", "id": "gpilpBMgn76m0Hmbe20F" }, { "date": "Thu Apr 01 2021", "mark": 5, "parent": "Education", "title": "Podcast", "id": "dDSYkmFbJ7n0WEOUp6JS" }, { "mark": 5, "title": "Yoga", "parent": "Mindfulness", "date": "Thu Apr 01 2021", "id": "d4qL44CPVxpU3JaQWeSn" }, { "mark": 5, "date": "Thu Apr 01 2021", "id": "azAJAgtDWr50T27CsvH5", "title": "Health,Body" }, { "mark": 5, "date": "Thu Apr 01 2021", "title": "Professional", "id": "WrNK333a6lOnUPp7aDDh" }, { "id": "Pm1oSaHnoyodK0SKPzgq", "parent": "Memory+Focus", "date": "Thu Apr 01 2021", "title": "Memory", "mark": 5 }, { "date": "Thu Apr 01 2021", "parent": "Food", "mark": 5, "title": "Supplements", "id": "PVlWBDRZSdYlST1lFPZK" }, { "parent": "Accountability", "id": "OHUGe3zB3CO3ZKfQ3wZU", "date": "Thu Apr 01 2021", "title": "Review,Planning", "mark": 5 }, { "title": "Fasting", "mark": 5, "parent": "Food", "id": "OFZYc1aF2G24kyf89DtU", "date": "Thu Apr 01 2021" }, { "mark": 5, "date": "Thu Apr 01 2021", "id": "MmeJCQ96LrnUur90jWgp", "title": "Accountability" }, { "mark": 5, "id": "Irs0vJfJfXZLgPJeNqKN", "title": "Healthy Eating", "date": "Thu Apr 01 2021", "parent": "Food" }, { "id": "IaChLvkra8Xva1LuaD3X", "date": "Thu Apr 01 2021", "title": "Food", "mark": 5 }, { "mark": "8", "title": "Education", "id": "GPj4m0tsZJ379D0RyKIW", "date": "Thu Apr 01 2021" }, { "mark": "8", "id": "DVh5y0NyLMUexTGDKUpi", "date": "Thu Apr 01 2021", "title": "Philosophy", "parent": "Education" }, { "mark": 5, "title": "Active Learning (Anki, Notes)", "id": "DSD03PvKjTZQN3umblQW", "date": "Thu Apr 01 2021", "parent": "Memory+Focus" }, { "date": "Thu Apr 01 2021", "mark": 5, "title": "Meditation", "id": "CnHOUBQEhBrAD0GItoiA", "parent": "Mindfulness" }, { "mark": 5, "parent": "Health,Body", "date": "Thu Apr 01 2021", "title": "Stretching", "id": "7K0cvh50FlXrmCX9ecDX" }, { "date": "Thu Apr 01 2021", "mark": 5, "title": "Sleep", "id": "6Fq5WcRm4UZZLxoryCNc" }, { "title": "Cold Shower", "id": "4AL7gEoiPmvAO5CajzIJ", "parent": "Health,Body", "date": "Thu Apr 01 2021", "mark": 5 }, { "date": "Thu Apr 01 2021", "mark": 5, "title": "Memory+Focus", "id": "3waLSLXgs2heVQvgdmGy" }, { "title": "Audiobooks", "id": "0cLhYnJAYtr3MViDFS5m", "mark": 5, "date": "Thu Apr 01 2021" }, { "title": "Exercise", "mark": 5, "date": "Thu Apr 01 2021", "parent": "Health,Body", "id": "0JE8xzidoV7V5prYTDYD" }];

        const dateNow = new Date(Date.now()).toDateString()
        goalsToSave = goalsToSave.map(({ title, parent }) => {
            const res = { title, active: true, dateTimeCreated: dateNow, parent: null }
            if (parent) res.parent = parent
            res.order = 100
            return res
        })

        goalsToSave.forEach(async (goal) => {
            await Api.addGoal(goal)
        })
    }

    return (
        <div className="">
            <button onClick={e => addNewGoalRewiew()} className="btn-main">+ NEW REVIEW</button>
            {/* <button onClick={e => saveAllOnce()} className="btn-main">Create All Goals</button> */}
            {addMode && <div className="add-goal">
                <label htmlFor="goal-name-input">Add new Goal</label>
                <input type="text" id="goal-name-input" onChange={e => setTitleOfNew(e.target.value)} value={titleOfNew} />
                <label htmlFor="goal-parent-input">Parent</label>
                <input type="text" id="goal-parent-input" onChange={e => setParentOfNew(e.target.value)} value={parentOfNew} />
                <label htmlFor="goal-order-input">Order</label>
                <input type="number" id="goal-order-input" onChange={e => setOrderOfNew(e.target.value)} value={orderOfNew} />
                <button onClick={e => createNewGoal()} className="btn-main">add</button>
            </div>}
            <button onClick={e => setAddMode(old => !old)} className="btn-main">{addMode ? 'Hide' : 'Add New Goal'}</button>
            <div className="lists-wrapper">
                <div className="reviews-list">
                    <ul>
                        {reviewsList}
                    </ul>
                    <button onClick={e => {
                        const newReviewsLimit = reviewsLimit + nextReviewsToLoadCount
                        setReviewsLimit(newReviewsLimit)
                    }}>... more</button>
                </div>
                <div className="goals-list">
                    <ol>
                        {goalsList}
                    </ol>
                </div>
                <div className="goals-list">
                    <ol>
                        {activeGoalsList}
                    </ol>
                </div>
            </div>
        </div>
    )

}

export default Goals;
