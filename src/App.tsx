import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        {/* <Route exact path="/movie/:id" component={Detail} /> */}
        <Route exact path="/" component={Home}>
          <Redirect to="/home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
