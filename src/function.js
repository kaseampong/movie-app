import {dataBase} from './config';
 console.log(dataBase);

 export function addMovie(movie) {
 dataBase.ref('watchlist/').child(movie.id).set({
    movie: movie
  }, function () {
    console.log('hi')
  }
)
}