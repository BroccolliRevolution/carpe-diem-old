import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import api from './api';
import Goals from './Goals';
import Home from './Home';
import TasksEdit from './TaskEdit';


var Api = api()

function App() {

  const [auth, setAuth] = useState('ok');

  useEffect(() => {
    const authenticated = Api.getAuth()
    if (authenticated) setAuth('yep')
  }, []);

  return (
    auth === 'yep' &&
    <div className="App">

      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/tasks-edit">
              <TasksEdit Api={Api}></TasksEdit>
            </Route>
            <Route path="/goals">
              <Goals Api={Api}></Goals>
            </Route>
            <Route path="/">
              <Home Api={Api}></Home>
            </Route>
          </Switch>

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasks-edit">Task Edit</Link>
              </li>
              <li>
                <Link to="/goals">Goals Reviews</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>



    </div>
  );
}

export default App;
