import React, {Component} from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

class Watchlist extends Component {  
  componentDidMount() {
    const {getWatchListMovies} = this.props;
    getWatchListMovies()
}

render(){
  const {watchlist, deleteWatchlistMovie} = this.props
  const myFavMovies = watchlist.length &&  watchlist.map(movie =>  {
     return (
       <div key={movie.movie.id}>
      <Card>
      <Image src={`https://image.tmdb.org/t/p/w500${movie.movie.poster_path}`} />
      <Card.Content>
        <Card.Header>
          {movie.movie.title}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {movie.movie.vote_average}
          </span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
          <Button 
          onClick={() => deleteWatchlistMovie(movie.movie.id)}
          negative>Delete from Watchlist</Button>
      </Card.Content>
    </Card>
    </div>
     
     )
     
      
  })
  
    return( 
      <div>
      <h1>You Have {watchlist.length} Movies To Watch </h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      {myFavMovies}
      </div>
      </div>
    )
  }
}

export default Watchlist;