import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Image } from 'semantic-ui-react';

const movieCard = (props) =>  {

const style = {
  marginLeft: {
      marginLeft: '20px',
  },
  card: {

    display: 'flex',
    flexWrap: 'wrap'
  }
};
const moviesMap = props.movies.map((movie, i) => {
  return (
    <div key={i} style={style.marginLeft}>
    <Card>
      <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <Card.Content>
        <Card.Header>
          {movie.title}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {movie.vote_average}
          </span>
        </Card.Meta>
        <Card.Description>
            {movie.overview}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          {movie.release_date}
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
