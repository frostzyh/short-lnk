import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Tracker } from 'meteor/tracker';

import {routes, onAuthChange } from '../imports/routes/routes.js';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  render(routes, document.getElementById('render-target'));
});
