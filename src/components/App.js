import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Image } from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super();
    this.state={
      movies: [
        {
          title: 'Harry potter',
          length: '2 hours and 30min',
          coverPicture: 'https://images.unsplash.com/photo-1506239015622-cc71326f7239?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4ad541e4ce0c1ae073c45273770990b6&auto=format&fit=crop&w=1950&q=80',
          cast : 'Ilias ,Samy',
          description: 'this is a must watch movie '
        },
        {
          title: 'need for speed',
          length: '1 hours and 59min',
          coverPicture: 'https://images.unsplash.com/photo-1516577631679-b146fe527518?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e2fc7c6faa9b9d2249938a6075aab553&auto=format&fit=crop&w=1950&q=80',
          cast : 'Ilias ,Samy',
          description: 'If you are looking for a good movie to watch , you cant go wrong with need for speed'
        }
      ]
    }
  }
  render() {
    const {movies} = this.state;
    const style = {
      container: {
        display:"flex"
      },
      card: {
        marginLeft: '20px'
      }
    };
    const mapedMovies =   movies.map((movie,i)=>{
        return(
            <div key={i} style={style.card}>
              <Card>
                <Image src={movie.coverPicture} />
                <Card.Content>
                  <Card.Header>
                    {movie.title}
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      {movie.cast}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                      {movie.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    {movie.length}
                  </a>
                </Card.Content>
              </Card>
            </div>
          )
    });

    return (
      <div style={style.container}>
        {mapedMovies}
      </div>
    );
  }
}

export default App;
