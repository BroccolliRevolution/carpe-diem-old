import firebaseConfig from './config/firebase-config'
import firebase from 'firebase'

//firebase.initializeApp(firebaseConfig)
//var db = firebase.firestore();

const api = (db) => {

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

    return {
        subscribeActivities,
        subscribeTasks,
        getAuth: getAuth,
        checkActivity: '',
        changeOrder: '',
        updateGrade: '',
        deleteActivity: '',
        saveTask: ''
    }
}

export default api;
