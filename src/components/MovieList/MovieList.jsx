import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import MovieListItem from 'components/MovieListItem/MovieListItem';
import { imageUrl } from '../../shared/api.js';
import { getReleaseYear } from '../../shared/getDate';
import noImage from 'components/images/noImagePlaceholder.png';

import styles from './MovieList.module.scss';

const MovieList = ({ movies, titleList }) => {
  const location = useLocation();
  return (
    <div>
      <h2 className={styles.movieListTitle}>{titleList}</h2>
      <ul className={styles.movieList}>
        {movies.map(({ id, title, release_date, poster_path }) => (
          <Link
            key={id}
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.movieListItem}
          >
            <MovieListItem
              image={
                poster_path !== null
                  ? `${imageUrl}w342/${poster_path}`
                  : noImage
              }
              date={
                release_date
                  ? getReleaseYear(release_date)
                  : 'Release date unknown'
              }
              title={title}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

MovieList.defaultProps = {
  movies: [],
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
    })
  ),
  titleList: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
