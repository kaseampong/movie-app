import React, { Component} from 'react';
import { Image, Card, Grid, Embed } from 'semantic-ui-react'
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
  // const {results} = this.props.videos;
  // console.log(results)
  // const filteredTrailers = results.length && results.filter((video) => {
  //    return video.type === "Trailer"
  //   })
  //   console.log(filteredTrailers);
  const {videos} = this.props;
  const filteredTrailers = videos.length && videos.filter((video)=> {
     return video.type === "Trailer"

  });
  const mapedTrailers = filteredTrailers.length && filteredTrailers.map((trailer, i) => {
      return (
      <div key={i}>
        <Embed
        id= {trailer.key}
        placeholder='/assets/images/vimeo-example.jpg'
        source='youtube'
      />
      </div>
        
      )
  })
  console.log(mapedTrailers)
  return (
  <div>
  
    <Grid columns={2}>
    <Grid.Row >
    <Grid.Column computer={4} >
        {
        
    poster_path && <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} size='medium' rounded />
        }
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
    {mapedTrailers}
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