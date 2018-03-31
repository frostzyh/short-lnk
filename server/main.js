import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';


Meteor.startup(() => {
  // code to run on server at startup

  // webapp exposes the connect API for handling requests through WebApp.connectHandlers.
  // request, response, next(this is a function)
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from server middleware');
    console.log(req.url, req.method, req.headers, req.query);

    // Info can be found in Chrome>Dev>Network>Headers
    // Set HTTP status code
    res.statusCode = 404;
    // Set HTTP headers
    res.setHeader('my-custom-header', "Yehui was here");
    // Set HTTP body
    res.write('<h1>404 Error. Given by Middleware~ </h1>');
    // End HTTP request, so nothing will be provided to user after this.
    res.end();

    next(); // allows server to continue;
  });
});
