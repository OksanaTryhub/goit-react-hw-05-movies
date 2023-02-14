import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews, imageUrl } from 'shared/api';
import { getReviewDate } from '../../shared/getDate';
import Loader from 'components/Loader/Loader';

import styles from './Reviews.module.scss';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  const elements = reviews.map(
    ({ id, author, author_details, content, updated_at }) => (
      <li key={id} className={styles.review_listItem}>
        <div className={styles.review_author}>
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
          <h3>{author}</h3>/<h4>{author_details.username}</h4>
          <p className={styles.review_date}>{getReviewDate(updated_at)}</p>
        </div>
        <p>{content}</p>
      </li>
    )
  );

  return (
    <div>
      {loading ? (
        <Loader />
      ) : reviews.length ? (
        <>
          <h2 className={styles.review_title}>Reviews</h2>
          <ul className={styles.review_list}>{elements}</ul>
        </>
      ) : (
        <h2 className={styles.review_title}>
          There aren't any reviews for this moview yet!
        </h2>
      )}
    </div>
  );
};

export default Reviews;
