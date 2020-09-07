import React, { useState, useEffect } from 'react';
import './App.css';



const RunHelpChore = ({ activities, db }) => {
  
  const runMe = e => {
    const getTimeSinceLastActivity = () => Date.now() - activities[0]?.timestamp

    // TODO this is how you remove the property
    // db.collection("activities").get().then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     doc.ref.update({
    //       active: firebase.firestore.FieldValue.delete()
    //     });
    //   });
    // });

    // TODO this is how you add the property
    // db.collection("tasks").get().then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     doc.ref.update({
    //       active: true
    //     });
    //   });
    // });

    alert(getTimeSinceLastActivity())

    return

    // activityRef.forEach((task, id) => {



    //   db.collection("tasks").doc(task.name).update({
    //     partOfDay: task.d,
    //     order: (id + 1)
    //   })
    //     .then(function () {
    //       console.log("Document successfully written!");
    //     })
    //     .catch(function (error) {
    //       console.error("Error writing document: ", error);
    //     });

    // })



    const dailies = [
      'Tibetans',
      'Journal',
      'Exercise',
      'Tech Podcast',
      'Yoga',
      'Meditation',
      'Book',
      'Medium',
      'Duolingo',
      'Elevate',
      'Audiobook',
      'Cardio',
      'MOOC',
      'Tech Course',
      'Podcast',
      'Stretches',
    ]


    // or maybe auxiliary? or hobbies?
    const habits = [
      'Project',
      'Computerphile',
      'Art',
      'CuriosityStream',
      'Science Festival',
      'Firebase Tutorial',
      'Cheery Friday',
      'Leisure',
      'Other Education',
      'FOOD',
      'NAP',
    ]

    const chores = [
      'Chores',
      'TODOs',
      'Bookmarks, Articles',
      'Cleanup Tabs, Papers',
      'Review',
      'Books Notes',
      'Idea Map',
      'Musings',
    ]


    const dailiesToUpdate = [
      { name: 'Tibetans', d: 'morning' },
      { name: 'Journal', d: 'morning' },
      { name: 'Tech Podcast', d: 'morning' },
      { name: 'Cardio', d: 'morning' },
      { name: 'Audiobook', d: 'morning' },
      { name: 'Book', d: 'morning' },
      { name: 'Exercise', d: 'morning' },
      { name: 'Yoga', d: '' },
      { name: 'Meditation', d: 'morning' },
      { name: 'MOOC', d: 'afternoon' },
      { name: 'Tech Course', d: 'afternoon' },
      { name: 'Podcast', d: 'afternoon' },
      { name: 'Stretches', d: 'evening' },
      { name: 'Medium', d: 'evening' },
      { name: 'Duolingo', d: 'evening' },
      { name: 'Elevate', d: 'evening' },
    ]



    const tasksToUpdate = [
      'Tibetans',
      'Journal',
      'Exercise',
      'Yoga',
      'Cardio',
      'Book',
      'Medium',
      'Duolingo',
      'Elevate',
      'Tech Podcast',
      'Audiobook',
      'MOOC',
      'Tech Course',
      'Stretches',
      'Meditation',
      'Podcast',

      // 'Project',
      // 'Computerphile',
      // 'Art',
      // 'CuriosityStream',
      // 'Science Festival',
      // 'Firebase Tutorial',
      // 'Cheery Friday',
      // 'Leisure',
      // 'Other Education',
      // 'FOOD',
      // 'NAP',

      // 'Chores',
      // 'Musings',
      // 'TODOs',
      // 'Bookmarks, Articles',
      // 'Cleanup Tabs, Papers',
      // 'Review',
      // 'Books Notes',
      // 'Idea Map',
    ]

    const getType = taskId => {
      if (dailies.includes(taskId)) return 'dailies'
      if (habits.includes(taskId)) return 'habits'
      if (chores.includes(taskId)) return 'chores'
    }

    // UNCOMMENT THIS TO MAKE THIS WORK
    return

    dailiesToUpdate.forEach((task, id) => {



      db.collection("tasks").doc(task.name).update({
        partOfDay: task.d,
        order: (id + 1)
      })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

    })


  }


  return (
    <button onClick={runMe}>RUNME</button>
  )
}

export default RunHelpChore;
