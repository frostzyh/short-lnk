import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser( (user) => {
  //console.log(user);
  const email = user.emails[0].address;

  try{
    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD,
        min: 3,
        max: 20,
      }
    }).validate({email})
  } catch (e) {
    //console.log('Error Message: >>>>>>>>', e)
    throw new Meteor.Error(400, e.message);
  }
  return true;
});


// Example 1
// const petSchema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1,
//     max: 200,
//     // name can be null when validating
//     optional: true
//   },
//   age: {
//     type: Number,
//     min: 0
//   },
//   contactNumber: {
//     type: String,
//     optional: true,
//     regEx: SimpleSchema.RegEx.Phone
//   }
// });
//
// petSchema.validate({
//   name: 'Sweet',
//   age: 22
// });
