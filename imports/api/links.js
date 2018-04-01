import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

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
  // greetUser(name) {
  //   // name = 'Strange' sets a default value to the argument
  //   console.log('greetUser is running');
  //
  //   if (!name){
  //     throw new Meteor.Error('invalid-arguments', 'Name is required!');
  //   }
  //   return 'Hello ' + name + '!';
  //   //return 'Hello ${name}!';
  // }
  'links.insert'(url){
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url,
      }
    }).validate({url})

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    });
  },

  'links.setVisibility'(_id, visible){
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({_id, visible});

    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: {visible}
    });
  },

  'links.trackVisit'(_id) {
    // We do not have user authentication because the link may be used by other people other than the user and we still want to track the visit.
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
    }).validate({ _id });

    Links.update({
      _id
    },{
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });
  },


});
