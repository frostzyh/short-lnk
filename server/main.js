import { Meteor } from 'meteor/meteor';

import '../imports/api/users';
import '../imports/api/links';

Meteor.startup(() => {
  // code to run on server at startup
  // Meteor.call('greetUser', (error, result) => {
  //   console.log('greetUser args', error, result);
  // });
});
