/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import { fetchProjectNames } from './helpers/fetchDB';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Patient from './pages/Patient';
import Project from './pages/Project';
import { iProjects } from './types';
import AuthContainer from './components/AuthContainer';
import supabase from './SupabaseClient';

type SessionContext = {
  user: {id: string, user_metadata: {avatar_url: string}, email: string} | undefined,
  access_token: string | undefined,
} | null;
export const sessionContext = React.createContext<SessionContext>(null);

function App() {
  const [projectNames, setProjectNames] = useState<iProjects[]>([]);
  const [currentSession, setCurrentSession] = useState<any>(null);
useEffect(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    setCurrentSession(session);
  });
}, []);

  useEffect(() => {
    fetchProjectNames()
    .then((data: any) => setProjectNames(data));
  }, []);

  return (
    <BrowserRouter>
      <sessionContext.Provider value={currentSession}>
        <Header projects={projectNames} />
        <AuthContainer>
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
        </AuthContainer>
      </sessionContext.Provider>
    </BrowserRouter>
  );
}

export default App;
