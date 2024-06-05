import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './Request'
import './Banner.css'

const Banner = () => {
    const[movie,setMovie] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const req = await axios.get(requests.fectchNetflixOriginals)
            setMovie(req.data.results[Math.floor(Math.random()*req.data.results.length-1)])
            console.log(req)
            return req;      
        }
        fetchData()
    },[])

    const baseUrl = 'https://image.tmdb.org/t/p/original/'


  return (
    <div className='Banner' style={{backgroundImage:`Url(${baseUrl}${movie.backdrop_path})`, height:"90vh", 
    backgroundRepeat:'no-repeat', backgroundPosition:'center-center', backgroundSize:'cover'}}>
      <div className="banner_contents">
        <div className="banner_title">
            <h2>{movie.name || movie.original_name || movie.original_title}</h2>
        </div>
        <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">Cast</button>
        </div>
        <h1 className='banner_description'>{movie.overview}</h1>
      </div>
    </div>
  )
}

export default Banner
