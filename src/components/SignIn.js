import React, {Component} from 'react';
import { Input, Button, Form} from 'semantic-ui-react' 
import {Redirect} from 'react-router-dom'
import {signInUser} from './Helpers';

 class signinForm extends Component {
   constructor() {
     super();
     this.handleLoginSubmit =  this.handleLoginSubmit.bind(this)
   }

  handleLoginSubmit (e) { 
    e.preventDefault();
    signInUser(this.email.value, this.password.value)
  }
   render() {

    return (
      
      <div>
        <form onSubmit={this.handleLoginSubmit}>
        <input ref={(email) => this.email = email}
        type='email'  placeholder='e.g example@gmail.com'/>
        <br/>
        <input ref={(password) => this.password = password}
        type='password' placeholder='*****' />
        <br/> 
        <Button onClick={this.handleSubmit}>Log in</Button>
        </form>
      
      </div>
    )
  }
 }


export default signinForm;