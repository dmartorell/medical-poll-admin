import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import { fetchProjectNames } from './helpers/fetchDB';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Patient from './pages/Patient';
import Project from './pages/Project';
import { iProjects } from './types';

function App() {
  const [projectNames, setProjectNames] = useState<iProjects[]>([]);

  useEffect(() => {
    fetchProjectNames()
    .then((data: any) => setProjectNames(data));
  }, []);
  return (
    <BrowserRouter>
      <Header projects={projectNames} />
      <Switch>
        <Route exact path="/project/:id/:name">
          <Project />
        </Route>
        <Route exact path="/patient/:id/pro:projectName/ts:timestamp">
          <Patient />
        </Route>
        <Route exact path="/home">
          <Home projects={projectNames} />
          <LoginButton />

        </Route>
        <Route exact path="/" component={Home}>
          <Redirect to="/home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
