import React, {Component} from 'react'
import Home from './components/Home';
import 'semantic-ui-css/semantic.min.css';
import SingleMovie from './components/SingleMovie';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavMenu from './components/NavBar';
import Watchlist from './components/WatchList';
import {dataBase} from './config';


class App extends Component {

  constructor(){
    super();
    this.state = {
      videos: [],
      singleMovie: {},
      page: 1,
      movies: [],
      searchValue: '',
      moviesSearched: [],
      error: {
        message: '',
        isError: false
      },
      watchlist: []
    }
  }
  componentDidMount() {
    const {page} = this.state 
    this.fetchMovies(page)
    this.getWatchListMovies()
  }
 
  fetchMovies () {
    const {page, movies} = this.state
    axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {


      api_key: process.env.REACT_APP_API_KEY,
      page: page,
      sort_by: 'vote_count.desc'
    }
    })

     .then(response => {


      this.setState({
        page: page + 1,
        movies:  [...movies, ...response.data.results],
        error: {
          //movies: movies.concat(response.data.results)
            message: '',
            isError: false
          }
        
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
        id: id,
        append_to_response: 'images'
      }
      })
       .then(response => {
        this.setState({
          singleMovie:  {...response.data, ...{isAdded: false}}
        })
      })
       .catch(error => {
       console.log(error);
      });
  }

  fetchVideos (id) {
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



  addMovieToWatchlist(movie) {
    dataBase.ref('watchlist/').child(movie.id).set({
      movie: movie
    },  () => {
      this.getWatchListMovies()
    }
  )
  }
  getWatchListMovies() {
    dataBase.ref('watchlist').once('value')
      .then((snapshot) => {
        if(snapshot.val() !== null) {

          const watchArray = Object.values(snapshot.val())
          this.setState({
             watchlist: watchArray
          })
        } else {
          this.setState({
            watchlist: []
          })
        }
    });
  }

  deleteWatchlistMovie(id) {
    dataBase.ref('watchlist').child(id).remove()
    .then(() => {
      this.getWatchListMovies()
    })
  }

  searchMovie (value) {
    if(value.length >= 1) {
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          query: value
        }
        })
         .then(response => {
        
             this.setState({
               searchValue: value ,
               moviesSearched: response.data.results
             })
           if(response.data.total_results === 0) {
             this.setState({
               error: {
                 message: 'No Movie Found',
                 isError: true
               }
               
             })
           } else {
              this.setState({
                error: {
                  message: '',
                  isError: false,
                }
              })
          }
        })
         .catch(error => {
         console.log(error);
        });  
    } else {
      this.setState({
        searchValue: '',
        error: {
          message: '',
          isError: false,
        }
      })
    }
    
      }
  render() {
    const {movies, searchValue, moviesSearched, error} = this.state;
    const moviesDisplayed = searchValue.length <= 1  ? movies : moviesSearched ;
    return (
    <Router>
    <div>
      <NavMenu 
      watchlist={this.state.watchlist}
      searchMovie= {this.searchMovie.bind(this)}/>
      <Route exact path="/" render={() => <Home  error={error} movies={moviesDisplayed} fetchMovies={this.fetchMovies.bind(this)}/>}/>
      <Route exact path="/movie/:id"  render={(props) => <SingleMovie
        singleMovie={this.state.singleMovie} 
        {...props} 
        fetchSingleMovie={this.fetchSingleMovie.bind(this)}
        fetchVideos={this.fetchVideos.bind(this)}
        videos={this.state.videos}
        addMovieToWatchlist = {this.addMovieToWatchlist.bind(this)}
        />
       }/> 
       <Route exact path="/watchlist" render={() => <Watchlist 
        getWatchListMovies={this.getWatchListMovies.bind(this)}
        watchlist={this.state.watchlist}
        deleteWatchlistMovie={this.deleteWatchlistMovie.bind(this)}
        />
       }/>
      
    </div>
  </Router>
    )
  }
}

export default App;