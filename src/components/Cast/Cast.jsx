import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieCredits, imageUrl } from 'shared/api';

import styles from './Cast.module.scss';

const Cast = ({ cast }) => {
  const [castData, setCastData] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCastData(data.cast);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  const elements = castData.map(({ id, name, profile_path, character }) => (
    <li key={id} className={styles.castGalleryItem}>
      <img
        src={profile_path ? `${imageUrl}w185/${profile_path}` : 'No photo'}
        alt={name}
        width="185"
        height="278"
      />
      <h3>{name}</h3>
      <h4>{character}</h4>
    </li>
  ));

  return (
    <div>
      <h2>Cast</h2>
      <ul className={styles.castGallery}>{elements}</ul>
    </div>
  );
};

export default Cast;
