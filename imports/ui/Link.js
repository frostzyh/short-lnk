import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Form, Segment, Button, Header, Grid, Message } from 'semantic-ui-react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default class Link extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if( !Meteor.userId()){
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <Segment>
        <PrivateHeader title="Your Links" />
        <div className="page-content">
          <LinksListFilters />
          <AddLink />
          <LinksList />
        </div>
      </Segment>
    );
  }
}
