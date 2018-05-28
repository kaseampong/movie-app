import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Image } from 'semantic-ui-react';

const movieCard = (props) =>  {

const style = {
  marginLeft: {
      marginLeft: '20px',
  },
  card: {
    display: 'flex'
  }
};
const moviesMap = props.movies.map((movie, i) => {
  return (
    <div key={i} style={style.marginLeft}>
    <Card>
      <Image src={movie.coverPicture} />
      <Card.Content>
        <Card.Header>
          {movie.title}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {movie.cast}
          </span>
        </Card.Meta>
        <Card.Description>
            {movie.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          {movie.length}
        </a>
      </Card.Content>
    </Card>
  </div>
  )
})
        return(

            <div  style={style.card}>
              {moviesMap}
            </div>
          )
    };



export default movieCard;
