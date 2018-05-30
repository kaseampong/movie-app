
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
      movies: []
    }
  }
  componentDidMount() {

    axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {

      api_key: process.env.REACT_APP_API_KEY,
      page: 4
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
    return (
    <Router>
    <div>
      <Route exact path="/" render={() => <Home  movies={this.state.movies} />}/>  
    </div>
  </Router>
    )
  }
}

export default App;