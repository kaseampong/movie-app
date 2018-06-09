import React, { Component } from 'react';
import { Input, Menu, Button, Header, Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';




class NavMenu extends Component { 
 
  render() {

    const {searchMovie, watchlist, handleSignOut, auth, user} = this.props;
    return (
      
      <Menu  color={'red'}>
      <Link to='/'>
        <Menu.Item name='Browse Movies' />
      </Link>
      { auth &&
      <Link to='/watchlist'>
        <Menu.Item>
          {`Watchlist(${watchlist.length})`} 
          </Menu.Item>
      </Link>
      }
        <Menu.Menu position='right'>
        { auth && 
          <Menu.Item>
            <Input onChange= {(e) => searchMovie(e.target.value) }
            icon='search'
             placeholder='Search...' />
          </Menu.Item>
        } 
        { auth &&
          <Menu.Item>
            <Link to={'/userprofile'}>
             <Header as='h5'>
               <Image size='mini' circular src={user.photoURL} />
                 {' '}{user.displayName}
             </Header>
           </Link>
          </Menu.Item>
        }
          <Menu.Item>
                 { auth ?
                 <Button onClick={handleSignOut}>
                    Sign Out
                  </Button>
                  : <Link to='/signup'>
                     Sign Up
                   </Link>
                 }
          </Menu.Item>
          
        </Menu.Menu>

      </Menu>
    
    )
  }
}

export default NavMenu;
