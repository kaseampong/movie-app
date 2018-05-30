import React from 'react';
import MovieCard from './MovieCard'

const Home = (props) => {
    const {movies} = props
    return (
      <div>
        <MovieCard  movies={movies}/>
      </div>
    );
  }


export default Home;
