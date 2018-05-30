import React from 'react';
import MovieCard from './MovieCard'
import { Button } from 'semantic-ui-react'
const Home = (props) => {
    const {movies} = props
    return (
      <div>
        <MovieCard  movies={movies}/>
        <div style={
          {
            width: '300px',
            margin: '25px auto'
          }
        }>
        <Button 
        fluid
        onClick={() => props.fetchMovies(1)}>Load More</Button>
        </div>
      </div>
    );
  }


export default Home;
