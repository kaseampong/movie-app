import React, {Component} from 'react'
import Home from './components/Home';
import 'semantic-ui-css/semantic.min.css';
import SingleMovie from './components/SingleMovie';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import NavMenu from './components/NavBar';
import Watchlist from './components/WatchList';
import {dataBase, Auth} from './config';
import Signup from './components/Signup';
import LogIn from './components/SignIn';
import {signUpUser, signInUser} from './components/Helpers';


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
      watchlist: [],
      isAuth: false,
      user: {}
    }
  }
  componentDidMount() {
    const {page} = this.state 
    this.fetchMovies(page)
    this.getWatchListMovies()
    Auth().onAuthStateChanged((user) => {
      if (user) {

        this.setState({
          isAuth: true,
          user: user
        })
        this.getWatchListMovies()
      } else {
        this.setState({
          isAuth: false
        })
      }
    });
  }

 componentWillUnmount() {
   console.log('dead')
 }

  handleSignOut () {
    Auth().signOut().then(() => {
      console.log('Signed Out');
    }, (error) => {
      console.error('Sign Out Error', error);
    });
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
    const {uid} = this.state.user
    dataBase.ref(`/users/${uid}/watchlist/`).child(movie.id).set({
      movie: movie
    },  () => {
      this.getWatchListMovies()
    }
  )
  }
  getWatchListMovies() {
    const {uid} = this.state.user
    dataBase.ref(`/users/${uid}/watchlist/`).once('value')
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
    const {uid} = this.state.user
        dataBase.ref(`/users/${uid}/watchlist/`).child(id).remove()
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
      auth={this.state.isAuth}
      handleSignOut={this.handleSignOut.bind(this)}
      watchlist={this.state.watchlist}
      searchMovie= {this.searchMovie.bind(this)}
      />

    <Switch>
     <PrivateRoute
       exact 
       path="/"
       component= {Home}
       auth={this.state.isAuth}
       error={error}
       movies={moviesDisplayed} 
       fetchMovies={this.fetchMovies.bind(this)}
      />
      <PrivateRoute 
        exact
        path="/movie/:id" 
        auth={this.state.isAuth}
        component={SingleMovie}
        singleMovie={this.state.singleMovie} 
        fetchSingleMovie={this.fetchSingleMovie.bind(this)}
        fetchVideos={this.fetchVideos.bind(this)}
        videos={this.state.videos}
        addMovieToWatchlist = {this.addMovieToWatchlist.bind(this)}
      />
       
      <PrivateRoute 
        exact 
        path="/watchlist" 
        auth={this.state.isAuth}
        component= {Watchlist}
        getWatchListMovies={this.getWatchListMovies.bind(this)}
        watchlist={this.state.watchlist}
        deleteWatchlistMovie={this.deleteWatchlistMovie.bind(this)}
      />
       <PublicRoute
        exact
         path="/signup" 
         auth={this.state.isAuth}
         component={Signup}
       /> 
       <PublicRoute 
           exact
           path="/login" 
           auth={this.state.isAuth}
           component={LogIn} 
       /> 
       <Route render={()=><h1>Page Not Found</h1>} />
      </Switch>
    </div>
  </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, auth, exact, path, ...rest }) => (
  <Route
   {...rest}
    exact = {exact}
    path = {path}
    render={props =>
      auth ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class PublicRoute  extends Component {
   
    render() {
      const { component: Component, auth, exact, path, ...rest} = this.props
      return (
  <Route
  {...rest}
    exact = {exact}
    path = {path}
    render={props =>
      !auth ? (
        <Component {...props} {...rest} 
       
        />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
  )
}
};

export default App;