import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Patient from './pages/Patient';
import Project from './pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/project/:id/:name">
          <Project />
        </Route>
        <Route exact path="/patient/:id/pro:projectName/ts:date">
          <Patient />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home}>
          <Redirect to="/home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
