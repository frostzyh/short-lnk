import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Segment, Button, Header, Grid, Message } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
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


  handleChange(e) {
      if (e.target.name === 'email')
        this.setState({email: e.target.value});
      if (e.target.name === 'password')
        this.setState({password: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;

    /* Password rules:
    * Contain at least one number
    * Contain at least one symbol
    * length between 6 and 16
    */
    // let pwRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // if(!password.match(pwRegex)){
    //   return this.setState({error: 'Invalid password. It should contain at least one number, one symbol and length of 6 to 16.'});
    // }

    Accounts.createUser({email, password}, (err) => {
      // If error occured, update error state. clear input fields.
      if (err) {
        this.setState({error:err.reason, email: '', password: ''});
      }
      else{
        // if no error, reset error state.
        this.setState({error: ''});
        console.log("Signup: Account created successfully!");
      }
    });
  }



  render() {

    const {email, password, error } = this.state;
    return (

      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup an account!</h1>
          {error ? <p>{error}</p> : undefined}

          <form onSubmit={this.handleClick} noValidate className="boxed-view__form">
            <input type="email" name='email' value={email} placeholder='E-mail address' onChange={this.handleChange} />
            <input type='password' name='password' value={password} placeholder='Password' onChange={this.handleChange} />
            <button className="button">Confirm</button>
          </form>
          <Link to="/"> Already have an account? Login! </Link>
        </div>
      </div>

      // <Segment>
      //   <Grid textAlign='center' style={{
      //       height: '100%'
      //   }} verticalAlign='middle'>
      //
      //     <Grid.Column style={{
      //         maxWidth: 450
      //     }}>
      //       <Header as='h2' color='teal' textAlign='center'>
      //         {/* <Image src='/logo.png'/> {' '}Log-in to your account */}
      //         Signup an account!
      //       </Header>
      //
      //       <Form size='large'>
      //         <Segment stacked>
      //           <Form.Input type='email' name='email' value = {email} fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
      //           <Form.Input type='password' name='password' value = {password} fluid icon='lock' iconPosition='left' placeholder='Password' onChange={this.handleChange} />
      //
      //           <Button color='teal' fluid size='large' onClick = {this.handleClick}>Confirm</Button>
      //
      //           {error ? (
      //             <Message negative>
      //               <Message.Header>Signup failed!</Message.Header>
      //               <p>{error}</p>
      //             </Message>
      //           ) : undefined}
      //
      //         </Segment>
      //       </Form>
      //
      //       <Message>
      //         Already have an account?
      //         <Link to="/"> Login!</Link>
      //       </Message>
      //
      //     </Grid.Column>
      //   </Grid>
      // </Segment>
    );
  }
}
