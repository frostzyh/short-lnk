import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import Login from '../ui/Login.js';
import Signup from '../ui/Signup.js';
import Link from '../ui/Link.js';
import NotFound from '../ui/NotFound.js';


const history = createHistory();
export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/links" component={Link} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);


//window.myLoc = history.location;
const unAuthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  console.log('isAuthenticated:', isAuthenticated);
  //console.log('current path is :', window.location.pathname);
  console.log('current history location is :', history.location.pathname);
  const pathname = history.location.pathname;
  const isUnAuthenticatedPages = unAuthenticatedPages.includes(pathname);
  const isAuthenticatedPages = authenticatedPages.includes(pathname);

  if(isUnAuthenticatedPages && isAuthenticated){
    history.push('/links');
  }
  else if(isAuthenticatedPages && !isAuthenticated){
    history.push('/');
  }
}
