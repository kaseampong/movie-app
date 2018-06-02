import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class NavMenu extends Component { 
  
  render() {
    const {searchMovie} = this.props;
    return (
      <Menu  color={'red'}>
      <Link to='/'>
        <Menu.Item name='Browse Movies' />
      </Link>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input onChange= {(e) => searchMovie(e.target.value) }
            icon='search'
             placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavMenu;
