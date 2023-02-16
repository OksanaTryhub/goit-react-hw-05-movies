import { useState, useEffect, useCallback, Suspense } from 'react';
import {
  Link,
  useParams,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { getMovieDetails, imageUrl } from 'shared/api';
import { getReleaseYear } from '../../shared/getDate';
import noImage from 'components/images/noImagePlaceholder.png';
import styles from './MovieDetailsPage.module.scss';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state;

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setGenres(data.genres);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    };
    fetchMovieData();
  }, [movieId]);

  const { title, overview, release_date, poster_path } = movie;

  const getMovieGenres = genres => {
    return genres.map(genre => genre.name).join(', ');
  };

  const goBack = useCallback(() => navigate(from), [navigate, from]);

  return (
    <main className={styles.movie_details}>
      <div className={styles.movie_wrapper}>
        <button className={styles.movie_button} onClick={goBack}>
          ← Go back
        </button>
        {poster_path ? (
          <img
            className={styles.movie_image}
            src={`${imageUrl}w342/${poster_path}`}
            alt={movie?.title}
          />
        ) : (
          <img
            className={styles.noImage}
            src={noImage}
            alt={movie?.title}
            width="342"
            height="513"
          />
        )}

        <div className={styles.movie_descriptionWrapper}>
          <div className={styles.movie_description}>
            <div>
              <h2 className={styles.movie_title}>
                {title ? title : 'Movie title'}
              </h2>
              <h3 className={styles.movie_subtitle}>
                {release_date
                  ? getReleaseYear(release_date)
                  : 'Release date unknown'}
              </h3>
              <h4 className={styles.movie_subtitle}>
                {getMovieGenres(genres)}
              </h4>
            </div>

            <p>{overview}</p>
          </div>
          <div className={styles.movie_buttonsWrapper}>
            <Link to="cast" state={{ from }}>
              <button className={styles.movie_button}>Cast</button>
            </Link>
            <Link to="reviews" state={{ from }}>
              <button className={styles.movie_button}>Reviews</button>
            </Link>
          </div>
        </div>
      </div>

      <Suspense>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;
