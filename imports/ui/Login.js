import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Form, Segment, Button, Header, Grid, Message } from 'semantic-ui-react';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    if( Meteor.userId()){
      this.props.history.replace('/links');
    }
  }


  handleChange(e, {name}) {
      if (name === 'email')
        this.setState({email: e.target.value});
      if (name === 'password')
        this.setState({password: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
      // If error occured, update error state. clear input fields.
      if (err) {
        this.setState({error:err.reason, email: '', password: ''});
      }
      else{
        // if no error, reset error state.
        this.setState({error: ''});
        console.log("Login: Login success!");
      }
    });
  }


  render() {
    const {email, password, error } = this.state;
    return (
      <Segment>
        <Grid textAlign='center' style={{
            height: '100%'
          }} verticalAlign='middle'>

          <Grid.Column style={{
              maxWidth: 450
            }}>
            <Header as='h2' color='teal' textAlign='center'>
              {/* <Image src='/logo.png'/> {' '}Log-in to your account */}
              Login to your account:
            </Header>

            <Form size='large'>
              <Segment stacked>
                <Form.Input type="email" name='email' value={email} fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
                <Form.Input type='password' name='password' value={password} fluid icon='lock' iconPosition='left' placeholder='Password' onChange={this.handleChange} />

                <Button color='teal' fluid size='large' onClick = {this.handleClick}>Login</Button>

                {error ? (
                  <Message negative>
                    <Message.Header>Signup failed!</Message.Header>
                    <p>{error}</p>
                  </Message>
                ) : undefined}

              </Segment>
            </Form>

            <Message>
              New to us?
              <Link to="/signup"> Signup!</Link>
            </Message>

          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
