import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Form, Segment, Button, Header, Grid, Message } from 'semantic-ui-react';

export default class PrivateHeader extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>{this.props.title}</h1>
        <Button onClick={() => Accounts.logout()}>Logout</Button>
      </div>
    );
  }
}


PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
