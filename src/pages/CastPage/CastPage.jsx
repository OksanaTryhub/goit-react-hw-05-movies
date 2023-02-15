import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getMovieCredits, imageUrl } from 'shared/api';
import Loader from 'components/Loader/Loader';
import actorPhoto from 'components/images/actorPhotoPlaceholder.jpg';

import styles from './CastPage.module.scss';

const Cast = ({ cast }) => {
  const [castData, setCastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCastData(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  const elements = castData.map(({ id, name, profile_path, character }) => (
    <li key={id} className={styles.cast_card}>
      {profile_path ? (
        <img
          className={styles.cast_cardImage}
          src={`${imageUrl}w185/${profile_path}`}
          alt={name}
          width="185"
          height="278"
        />
      ) : (
        <img
          className={styles.cast_cardImage}
          src={actorPhoto}
          alt={name}
          width="185"
          height="278"
        />
      )}

      <h3 className={styles.cast_cardTitle}>{name}</h3>
      <h4 className={styles.cast_cardSubtitle}>{character}</h4>
    </li>
  ));

  return (
    <div className={styles.cast_wrapper}>
      {loading ? (
        <Loader />
      ) : castData.length ? (
        <>
          <h2 className={styles.cast_title}>Cast</h2>
          <ul className={styles.cast_gallery}>{elements}</ul>
        </>
      ) : (
        <h2 className={styles.cast_title}>
          There is no information about the cast
        </h2>
      )}
    </div>
  );
};

export default Cast;

Cast.defaultProps = {
  cast: [],
};

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      profile_path: PropTypes.string,
      character: PropTypes.string,
    })
  ),
};
