import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(error => {
  // const customError = new MyCustomErrorType(error.message);
  // customError.errorList = error.details;
  // return customError;
  return new Meteor.Error(400, error.message);
});
