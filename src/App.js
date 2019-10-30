import React, {useState, useEffect} from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './views/HomePage';
import Candidates from './views/CandidatesPage';
import Company from './views/CompanyPage';
import Nav from './components/Navigation';
import Candidate from './views/CandidatePage';
import LoginPage from './views/LoginPage';
import {useSelector} from 'react-redux';
import Toast from './components/Toast';

function App() {
  const [currentUser, setCurrentUser] = useState({
    email:'',
    password:''
  });

  const login = useSelector((state)=> state);

  useEffect(() => {
    setCurrentUser(login);
  }, [login])

  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path='/company'>
          <Company />
        </Route>
        <Route path='/candidates/:id'>
          <Candidate />
        </Route>
        <Route path='/candidates'>
          <Candidates />
        </Route>
        <Route path='/' exact>
          {!currentUser.email ? <LoginPage /> : <HomePage />}
        </Route>
        <Route path='/'>
          <h1>404</h1>
          <h2>You've taken the wrong path</h2>
        </Route>
      </Switch>
      <Toast currentUser={currentUser}/>
    </div>
  );
}

export default App;
