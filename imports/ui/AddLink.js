import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Form, Segment, Button, Header, Grid, Message } from 'semantic-ui-react';

export default class PrivateHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, {name}) {
    e.preventDefault();
    if(name === 'url')
      this.setState({url: e.target.value.trim()});
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = this.state.url;
    if (url) {
      //Links.insert({ url, userId: Meteor.userId() });
      Meteor.call('links.insert', url);
      //console.log("Link added:", url);
      this.setState({url:''});
    }
  }

  render(){
    const { url } = this.state;
    return(
      <div>
        <p>Add Link</p>
        <Form size='large'>
          <Form.Input name='url' value={url}  size= 'medium' value={this.state.url} placeholder='url' onChange={this.handleChange} />
          <Button color='teal'  size='large' onClick = {this.handleSubmit}>Add Link</Button>
        </Form>
      </div>
    );
  }
}
