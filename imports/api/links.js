import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Links = new Mongo.Collection('links');


// The name 'links' in publish does not refer to the collection in mongoDB
if (Meteor.isServer){
  Meteor.publish('links', function () {
    // Return every entrire to every user.
    //return Links.find();

    // Return links that associated with userId
    return Links.find({userId: this.userId});
  });
}


Meteor.methods({
  greetUser(name) {
    // name = 'Strange' sets a default value to the argument
    console.log('greetUser is running');

    if (!name){
      throw new Meteor.Error('invalid-arguments', 'Name is required!');
    }
    //return 'Hello ' + name + '!';
    return 'Hello ${name}!';
  }
});
