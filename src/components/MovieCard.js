import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

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
console.log(props.movies)
const moviesMap = props.movies.map((movie, i) => {
  return (
    <div key={i} style={style.marginLeft}>
    <Link to={`/movie/${movie.id}`}>
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
          <Icon name='user' />
          {movie.release_date}
      </Card.Content>
    </Card>
    </Link>
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
