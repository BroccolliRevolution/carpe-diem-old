 import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import firebase from 'firebase'
import firebaseConfig from './config/firebase-config'

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore();

function App() {
  const [title, setTitle] = useState('coje');
  const [entries, setEntries] = useState([]);
  const didMount = useRef(false);

  const subscribeFirebase = () => {
    console.log('database SUBSCRIBED!')
    return db.collection("messages")
    .onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(doc => 
            cities.push({
              id: doc.id,
              title: doc.data().title
            })
        )
        setEntries(items => [...cities])    
    })
  } 

  useEffect(() => {
  
    if (didMount.current) return
    didMount.current = true;
    subscribeFirebase()
  
  });

  const saveFirebase = (e) => {
    db.collection("messages").add({title})
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  const listItems = entries.map(({title, id}) =>
    <li key={id}>
      {title}
    </li>
  );

  return (
    <div className="App">
      <input type="text" placeholder="First Name" onChange={e => setTitle(e.target.value)} value={title} />
      <button onClick={saveFirebase}>SAVE</button>
      <p>{title}</p>

      <ul>{listItems}</ul>
    </div>
  );
}

export default App;
