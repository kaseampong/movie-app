import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
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
        <Button onClick={this.handleSubmit}>Log in</Button>
        </div>
        </form>
      
      </div>
    )
  }
 }


export default signinForm;