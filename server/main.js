import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';


Meteor.startup(() => {
  // code to run on server at startup

  // webapp exposes the connect API for handling requests through WebApp.connectHandlers.
  // request, response, next(this is a function)
  WebApp.connectHandlers.use((req, res, next) => {
    // Get basic infor from request.
    // console.log('This is from server middleware');
    // console.log(req.url, req.method, req.headers, req.query);

    // Info can be found in Chrome>Dev>Network>Headers

    /* Practice 1
    // Set HTTP status code
    res.statusCode = 404;
    // Set HTTP headers
    res.setHeader('my-custom-header', "Yehui was here");
    // Set HTTP body
    res.write('<h1>404 Error. Given by Middleware~ </h1>');
    // End HTTP request, so nothing will be provided to user after this.
    res.end();
    */



    // Remove slash from url. for example '/fdsfsd' => 'fdsfsd'
    // Get the path after localhost:3000/
    const _id = req.url.slice(1);
    // Find the matching url from database
    const link = Links.findOne({ _id });

    // If url was found, redirect to the url correspond to the id. If not skip.
    if(link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    }
    else{
      next();
    }
  });
});
