import { useState, useEffect } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';

import { getMovieDetails, imageUrl } from 'shared/api';
import { getReleaseYear } from '../../shared/getDate';

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
      <div className={styles.movie_wrapper}>
        <Link to="/">
          <button className={styles.movie_button}>← Go back</button>
        </Link>
        <img
          className={styles.movie_image}
          src={poster_path ? `${imageUrl}w342/${poster_path}` : 'No image'}
          alt={title}
        />
        <div className={styles.movie_descriptionWrapper}>
          <div className={styles.movie_description}>
            <div>
              <h2 className={styles.movie_title}>
                {title ? title : 'Movie title'}
              </h2>
              <h3 className={styles.movie_subtitle}>
                {release_date ? getReleaseYear(release_date) : 'Unknown'}
              </h3>
              <h4 className={styles.movie_subtitle}>
                {getMovieGenres(genres)}
              </h4>
            </div>

            <p>{overview}</p>
          </div>
          <div className={styles.movie_buttonsWrapper}>
            <Link to="cast">
              <button className={styles.movie_button}>Cast</button>
            </Link>
            <Link to="reviews">
              <button className={styles.movie_button}>Reviews</button>
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
