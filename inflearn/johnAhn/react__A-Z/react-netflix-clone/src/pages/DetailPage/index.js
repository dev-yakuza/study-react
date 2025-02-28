import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
      // console.log(request);
    }

    fetchData();
  }, [movieId])
  
  // if (!movie) return null;
  
  console.log(movie);
  return (
    <section>
      <img
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="modal__poster-img" 
      />
    </section>
  )
}
