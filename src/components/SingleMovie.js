import React, { Component} from 'react';
import { Image, Card, Grid, Embed, Button } from 'semantic-ui-react'
import {dataBase} from '../config';

class SingleMovie extends Component {

  componentDidMount() {
    const {fetchSingleMovie, fetchVideos} = this.props
    const {id} = this.props.match.params;
    fetchSingleMovie(id);
    fetchVideos(id);
  }

  render() {
   
  const {id} = this.props.match.params;
  const {poster_path, title, overview, vote_average, release_date } = this.props.singleMovie
  const {singleMovie, addMovieToWatchlist} = this.props;
  const {videos} = this.props;
  const filteredTrailers = videos.length && videos.filter((video)=> {
     return video.type === "Trailer"

  });
  const {backdrop_path} = this.props.singleMovie;

  const trailer = filteredTrailers.length && filteredTrailers[0].key;
      
  return (
  <div>
  
    <Grid columns={2}>
    <Grid.Row >
    <Grid.Column computer={4} >
        {
        
    poster_path && <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} size='medium' rounded />
        }
        <Button onClick={() => addMovieToWatchlist(singleMovie)}>Add to Watch-list</Button>
    </Grid.Column>
    <Grid.Column computer={12} >
    <div style={
      {height: '100vh',
       overflow: 'scroll'
      }
    }>
      <Card fluid>
    <Card.Content>
      <Card.Header>
       {title}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {vote_average}
        </span>
      </Card.Meta>
      <Card.Description>
        {overview}
      </Card.Description>
    </Card.Content>
    <Card.Content>
    <div>
        <Embed
        id= {trailer}
        placeholder={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        
        source='youtube'
      />
      </div>
  </Card.Content>
    <Card.Content extra>
    {release_date}
    </Card.Content>
  </Card>
  </div>
  </Grid.Column>
  </Grid.Row>
  </Grid>

  
  </div>
  )
}
}

export default SingleMovie;