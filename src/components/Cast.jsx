import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './API';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      try {
        const castResponse = await api.get(`/movie/${movieId}/credits`);
        setCast(castResponse.data.cast);
      } catch (error) {
        console.error('Помилка при отриманні інформації про акторів', error);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cast;
