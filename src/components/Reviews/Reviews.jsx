import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews, imageUrl } from 'shared/api';

import styles from './Reviews.module.scss';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  const elements = reviews.map(
    ({ id, author, author_details, content, updated_at }) => (
      <li key={id} className={styles.reviewListItem}>
        <div className={styles.reviewAuthor}>
          <img
            src={
              author_details.avatar_path &&
              !author_details.avatar_path.includes('gravatar')
                ? `${imageUrl}w45/${author_details.avatar_path}`
                : 'No photo'
            }
            alt={author}
            width="45"
            height="45"
          />
          <h3>{author}</h3>
          <h4>{author_details.username}</h4>
          <p>{updated_at}</p>
        </div>
        <p>{content}</p>
      </li>
    )
  );

  return (
    <div>
      <h2>Reviews</h2>
      <ul className={styles.reviewList}>{elements}</ul>
    </div>
  );
};

export default Reviews;
