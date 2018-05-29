import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import MovieCard from './MovieCard'

class App extends Component {
  constructor(){
    super();
    this.state= {
      movies: []
    }
  }
  componentDidMount() {

    axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key: process.env.REACT_APP_API_KEY
    }
    })

     .then(response => {


      this.setState({
        movies: response.data.results
      })
    })
     .catch(error => {
     console.log(error);
    });
  }



  render() {
    console.log(process.env.NODE_ENV)
    const {movies} = this.state
    console.log(this.state.movies)

    return (
      <div>
        <MovieCard  movies={movies}/>

      </div>
    );
  }
}

export default App;
