import React, {Component} from 'react'
import { Header, Icon, Image, Input } from 'semantic-ui-react'

class userProfile extends Component {
  render() {
    const {user} = this.props
    return (
    <div>
      <Header as='h2' icon textAlign='center'>
        <Image size='massive' circular src={user.photoURL} />
        <Header.Content>
          {user.displayName}
        </Header.Content>
        <br/>
        <Input type='file' />
      </Header>
    </div>
    )
  }
}

export default userProfile;
