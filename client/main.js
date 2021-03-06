import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import {routes, onAuthChange } from '../imports/routes/routes.js';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  // Meteor.call('greetUser', (error, result) => {
  //   console.log('greetUser args', error, result);
  // });

  // Triger error to test
  //Meteor.call('links.insert', 'fsdafsdaf');

  Session.set('showVisible', true);
  render(routes, document.getElementById('render-target'));
});
