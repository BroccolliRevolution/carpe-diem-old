import firebase from 'firebase'
import firebaseConfig from './config/firebase-config'
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore();

const api = () => {

    function myDateFormat(dateIn) {
        var yyyy = dateIn.getFullYear()
        var mm = dateIn.getMonth() + 1
        var dd = dateIn.getDate()
        var min = dateIn.getMinutes()
        var hh = dateIn.getHours()

        if (+mm < 10) mm = '0' + mm
        if (+dd < 10) dd = '0' + dd
        if (+hh < 10) hh = '0' + hh
        if (+min < 10) min = '0' + min
        return yyyy + '-' + mm + '-' + dd + ' => ' + hh + ':' + min
    }

    const subscribeActivities = (fn, dateOffset) => {
        var date = new Date(Date.now());
        var prev_date = new Date();
        date.setDate(prev_date.getDate() - dateOffset);
        date.setHours(0)
        date.setMinutes(0)

        db.collection("activities").orderBy("date", 'desc').where("date", ">", date)
            .onSnapshot(function (querySnapshot) {
                var activities = []
                querySnapshot.forEach(doc => {
                    let datetime = new Date(doc.data().timestamp)

                    const datetimeStr = myDateFormat(datetime)
                    activities.push({
                        id: doc.id,
                        task: doc.data().task,
                        timestamp: doc.data().timestamp,
                        partOfDay: doc.data().partOfDay,
                        greade: doc.data().grade,
                        reward: doc.data().reward,
                        datetime: datetimeStr,
                        project: doc.data().project,
                    })

                })
                fn(activities)

            })
    }


    const subscribeTasks = (fn) => {
        db.collection("tasks").orderBy("order").where("active", "==", true)
            .onSnapshot(function (querySnapshot) {
                var tasks = []

                // DEFINE tasks properties
                querySnapshot.forEach(doc =>
                    tasks.push({
                        id: doc.id,
                        title: doc.data().title,
                        categories: doc.data().categories,
                        order: doc.data().order,
                        level: doc.data().level,
                        importance: doc.data().importance,
                        type: doc.data().type,
                        partOfDay: doc.data().partOfDay,
                        project: doc.data().project,
                    })
                )
                fn(tasks)
            })
    }



    const getAuth = () => {

        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(function (user) {
                window.user = user; // user is undefined if no user signed in
                if (!user) {
                    var provider = new firebase.auth.GoogleAuthProvider();
                    provider.addScope('profile');
                    provider.addScope('email');
                    provider.addScope('https://www.googleapis.com/auth/plus.me');
                    firebase.auth().signInWithPopup(provider); // Opens a popup window and returns a promise to handle errors.

                } else {
                    // TODO this change to user for real :D     

                }

                resolve(true)
            });
        })
    }

    const checkActivity = (task, tasks) => {
        return new Promise(resolve => {

            const getActivityReward = (task) => {
                const randVar = Math.floor(Math.random() * 9) + 1
                
                let randConst = 1
                if (randVar < 3) {
                    randConst = 0
                }

                const importance = tasks.find(({ id }) => id === task)?.importance || 0


                // TODO this extra is KEY - it will depend on level and maybe other things
                const maxExtra = 20
                const extra = Math.floor(Math.random() * maxExtra) + 1


                // TODO this penalty will not be random in future
                const randVarPen = Math.floor(Math.random() * 9) + 1
                
                const maxPen = 20
                let penalty = 0
                if (randVarPen < 3) {
                    penalty = Math.floor(Math.random() * maxPen) + 1
                }
                

                let res = {
                    reward: Math.floor((randConst) * importance + extra - penalty),
                    score: importance
                }
                if (randConst === 0) res.reward = 0
                

                return res
            }

            const {reward, score} = getActivityReward(task)

            const newActivity = {
                id: Date.now(),
                timestamp: Date.now(),
                date: new Date(Date.now()),
                task,
                reward,
                score
            }
            db.collection("activities").add(newActivity)
                .then(function (docRef) {
                    resolve(newActivity)
                    console.log("Document written with ID: ", docRef.id)
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error)
                });
        })
    }

    const changeOrder = ({ id, order }, by) => {
        db.collection("tasks").doc(id)
            .update({ order: order - by })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
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

    const deleteActivity = id => {
        db.collection('activities').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const saveTask = (title, type) => {
        if (title == '' || type == '') {
            alert('set task and type')
            return
        }
        db.collection("tasks").doc(title).set({
            active: true,
            categories: [],
            importance: 100,
            isDaily: true,
            level: 1,
            order: 20,
            type
        })
    }

    const subscribeGoals = fn => {
        db.collection("goals").orderBy("date", "asc")//.where("active", "==", true)
            .onSnapshot(function (querySnapshot) {
                var goals = []

                // DEFINE tasks properties
                querySnapshot.forEach(doc =>
                    goals.push({
                        id: doc.id,
                        date: doc.data().date,
                        mark: doc.data().mark,
                        title: doc.data().title,
                        parent: doc.data().parent,
                    })
                )
                fn(goals)
            })
    }

    const addGoal = goal => {
        db.collection("goals").add(goal)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id)
            })
            .catch(function (error) {
                console.error("Error adding document: ", error)
            });
    }


    const updateGoalMark = (goalId, mark) => {
        var activityRef = db.collection('goals').doc(goalId);
        activityRef
            .update({ mark })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    const updateDailyPerformance = (reward, score, activitiesCount) => {
        const id = new Date(Date.now()).toDateString()
        const performance = {
            date: new Date(Date.now()),
            activitiesCount,
            reward,
            score
        }


        console.log('heeej', performance)
        

        db.collection('dailyPerformances').doc(id).set(performance, { merge: true })
    }

    const getAllGoals = async () => {
        const snapshot = await db.collection('goals').orderBy("date", "asc").get()
        return snapshot.docs.map(doc => doc.data());
    }

    const getDailyPerformance = async (fn) => {
        const date = new Date(Date.now()).toDateString()

        db.collection("dailyPerformances").doc(date)
            .onSnapshot((doc) => {
                fn(doc.data())
            });
    }

    return {
        subscribeActivities,
        subscribeTasks,
        getAuth: getAuth,
        checkActivity,
        changeOrder,
        updateGrade,
        deleteActivity,
        saveTask,
        subscribeGoals,
        addGoal,
        updateGoalMark,
        updateDailyPerformance,
        getDailyPerformance,
        getAllGoals
    }
}

export default api;
