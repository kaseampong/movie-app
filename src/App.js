import React, {Component} from 'react'
import Home from './components/Home';
import 'semantic-ui-css/semantic.min.css';
import SingleMovie from './components/SingleMovie';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {

  constructor(){
    super();
    this.state = {
      videos: [],
      singleMovie: {},
      page: 1,
      movies: []
    }
  }
  componentDidMount() {
    const {page} = this.state 
    this.fetchMovies(page)
  }
  
  fetchMovies () {
    const {page, movies} = this.state
    axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {

      api_key: process.env.REACT_APP_API_KEY,
      page: page
    }
    })

     .then(response => {


      this.setState({
        page: page + 1,
        movies:  [...movies, ...response.data.results]
        //movies: movies.concat(response.data.results)
      })
    })
     .catch(error => {
     console.log(error);
    });
  }

  fetchSingleMovie (id) {
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        id: id
      }
      })
       .then(response => {
        this.setState({
          singleMovie:  response.data
        })
      })
       .catch(error => {
       console.log(error);
      });
  }

  fetchVideos (id) {
    console.log('hi');
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        id: id
      }
      })
       .then(response => {
        this.setState({
          videos:  response.data.results
        })
      })
       .catch(error => {
       console.log(error);
      });
  }

  render() {
    return (
    <Router>
    <div>
      <Route exact path="/" render={() => <Home  movies={this.state.movies} fetchMovies={this.fetchMovies.bind(this)}/>}/>
      <Route exact path="/movie/:id"  render={(props) => <SingleMovie
        singleMovie={this.state.singleMovie} 
        {...props} 
        fetchSingleMovie={this.fetchSingleMovie.bind(this)}
        fetchVideos={this.fetchVideos.bind(this)}
        videos={this.state.videos}
        />

         }/> 
      
    </div>
  </Router>
    )
  }
}

export default App;