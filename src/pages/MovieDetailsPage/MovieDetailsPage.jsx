import { useState, useEffect } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';

import { getMovieDetails, imageUrl } from 'shared/api';
import getReleaseYear from '../../shared/getReleaseYear';

import styles from './MovieDetailsPage.module.scss';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setGenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieData();
  }, [movieId]);

  const { title, overview, release_date, poster_path } = movie;

  const getMovieGenres = genres => {
    return genres.map(genre => genre.name).join(', ');
  };

  return (
    <div className={styles.movie_details}>
      <Link to="/"> Go back</Link>
      <div className={styles.movie_wrapper}>
        <img
          className={styles.movie_image}
          src={poster_path ? `${imageUrl}w342/${poster_path}` : 'No image'}
          alt={title}
        />
        <div className={styles.movie_description}>
          <div>
            <h2>{title ? title : 'Movie title'}</h2>
            <h3>{release_date ? getReleaseYear(release_date) : 'Unknown'}</h3>
            <h4>{getMovieGenres(genres)}</h4>
          </div>

          <p>{overview}</p>
        </div>
      </div>

      <button>
        <Link to="cast">Cast</Link>
      </button>
      <button>
        <Link to="reviews">Reviews</Link>
      </button>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
