import React, {Component} from 'react';
import { Input, Button, Form } from 'semantic-ui-react'
import {signUpUser} from './Helpers';

 class signupForm extends Component {
   constructor() {
     super();
     this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
   }
  handleSignupSubmit (e) { 
    e.preventDefault();
    signUpUser(this.email.value, this.password.value)
  }
   
  render() {
    return (
      <div>
        <form onSubmit={this.handleSignupSubmit}>
        <input ref={(email) => this.email = email}
        type='email'  placeholder='e.g example@gmail.com'/>
        <br/>
        <input ref={(password) => this.password = password}
        type='password' placeholder='*****' />
        <br/> 
        <Button onClick={this.handleSubmit}>Sign Up</Button>
        </form>
      </div>
    )
  }
 }


export default signupForm;