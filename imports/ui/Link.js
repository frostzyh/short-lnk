import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Form, Segment, Button, Header, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Links } from '../api/links';
import LinksList from './LinksList';

export default class Link extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if( !Meteor.userId()){
      this.props.history.replace('/');
    }
  }

  handleChange(e, {name}) {
    if(name === 'url')
      this.setState({url: e.target.value.trim()});
  }

  handleSubmit() {
    const url = this.state.url;
    if (url) {
      Links.insert({
        url,
        userId: Meteor.userId()
      });
      console.log("Link added:", url);
      this.setState({url:''});
    }
  }

  render() {
    const { url } = this.state;
    return (
      <Segment>
        <h1>Your Links</h1>
        <Button onClick={() => Accounts.logout()}>Logout</Button>
        <Segment>
          <LinksList />
        </Segment>

        <p>Add Link</p>
        <Form size='large'>
          <Form.Input name='url' value={url}  size= 'medium' value={this.state.url} placeholder='url' onChange={this.handleChange} />
          <Button color='teal'  size='large' onClick = {this.handleSubmit}>Add Link</Button>
        </Form>
      </Segment>
    );
  }
}
