import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

const UserList = () => {
    const [listData, setListData] = useState([]);
useEffect(() => {
    let moviesId = window.localStorage.movies ? window.localStorage.movies.split(",") : [] ;
    console.log(moviesId);
    for(let i = 0; i < moviesId.length; i++) {
        axios.get(`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=6b9540d5cd32a6501cd3f757474d552b&language=fr-FR`).then((res) => setListData((listData) => [...listData, res.data]));
    }
}, []);
    return (
        <div className="user-list-page">
           <Header />
           <h2>Coup de coeur <span>💖</span></h2>
           <div className="result">
               {listData.length > 0 ? listData.map((movie) => (
                    <Card movie={movie} key={movie.id} />
               )) : <h2>Aucun coup de coeur pour le moment</h2>}
           </div>
    
        </div>
    );
};

export default UserList;