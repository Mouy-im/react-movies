import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Card from './Card';

const Form = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [search, setSearch] = useState("");
    const [sortGoodBad, setSortGoodBad] = useState("null");

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6b9540d5cd32a6501cd3f757474d552b&query=${search}&language=fr-FR`).then(({data}) => setMoviesData(data.results));
    }, [search]);
    return (
        <div className="form-component">
            <div className="form-container">
                <form>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} id="search-input" placeholder="Entrez le titre d'un film" />
                    <input type="submit" value="Rechercher" />
                </form>
                <div className="btn-sort-container">
                    <div className="btn-sort" id="goodToBad" onClick={(e) => setSortGoodBad(e.target.id)}>Top<span>➜</span></div>
                    <div className="btn-sort" id="badToGood" onClick={(e) => setSortGoodBad(e.target.id)}>Flop<span>➜</span></div>

                </div>
            </div>
            <div className="result">
                {moviesData
                .slice(0,12)
                .sort((a,b) => { 
                    if(sortGoodBad === 'goodToBad') {
                        return b.vote_average - a.vote_average;
                    } else if (sortGoodBad === 'badToGood') {
                        return a.vote_average - b.vote_average;
                    }
                })
                .map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
       
    );
};

export default Form;