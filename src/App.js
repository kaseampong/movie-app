import React, {Component} from 'react'
import Home from './components/Home';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {

  constructor(){
    super();
    this.state = {
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

  render() {
    console.log(this.state.movies)
    return (
    <Router>
    <div>
      <Route exact path="/" render={() => <Home  movies={this.state.movies} fetchMovies={this.fetchMovies.bind(this)}/>}/>  
    </div>
  </Router>
    )
  }
}

export default App;