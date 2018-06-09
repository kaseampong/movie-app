import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
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
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <div className='ui input'>
        <input ref={(email) => this.email = email}
        type='email'  placeholder='e.g example@gmail.com'/>
        </div>
        <br/>
        <div className='ui input'>
        <input ref={(password) => this.password = password}
        type='password' placeholder='*****' />
        </div> 
        <br/>
        <Button onClick={this.handleSubmit}>Sign Up</Button>
        </div>
        </form>
      </div>
    )
  }
 }


export default signupForm;