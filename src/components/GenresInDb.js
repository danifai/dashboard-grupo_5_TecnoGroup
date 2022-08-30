import React from 'react';
import Genre  from './Genre';

// let genres = [
//     {genre: 'Acción'},
//     {genre: 'Animación'},
//     {genre: 'Aventura'},
//     {genre: 'Ciencia Ficción'},
//     {genre: 'Comedia'},
//     {genre: 'Documental'},
//     {genre: 'Drama'},
//     {genre: 'Fantasia'},
//     {genre: 'Infantiles'},
//     {genre: 'Musical'}
// ]

// function GenresInDb(){
//     return (

//     )

// }

class GenresInDb extends React.Component {
    state = {
        genresList: [],
        overOnH6: false
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/genres')
            .then(response => response.json())
            .then(genres => {
                this.setState({
                    genresList: genres.data
                });
            })
            .catch(err => console.log(err));
    }

    handleMouseOver = () => {
        this.setState({
            overOnH6: (!this.state.overOnH6)
        })
    }
    
    render(){
        return(
            <React.Fragment>
            {/*<!-- Categories in DB -->*/}
            <div className="col-lg-6 mb-4">						
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 onClick={this.handleMouseOver} className="m-0 font-weight-bold text-gray-800">Genres in Data Base</h6>
                    </div>
                    <div className={`card-body ${this.state.overOnH6 && 'bg-secondary'}`}>
                        <div className="row">
                            {
                                this.state.genresList.map((genre,index)=>{
                                    return  <Genre  genre = {genre.name}  key={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
       
    </React.Fragment>
        );
    }
}

export default GenresInDb;