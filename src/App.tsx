import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import { fetchProjectNames } from './helpers/fetchDB';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Patient from './pages/Patient';
import Project from './pages/Project';
import { iProjects } from './types';

function App() {
  const [projectNames, setProjectNames] = useState<iProjects[]>([]);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    fetchProjectNames()
    .then((data: any) => setProjectNames(data));
  }, []);

  console.log({ isAuthenticated });
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
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
