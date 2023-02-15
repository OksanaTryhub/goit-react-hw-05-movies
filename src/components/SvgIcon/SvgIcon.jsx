import PropTypes from 'prop-types';
import styles from './SvgIcon.module.scss';

const SvgIcon = ({ id }) => {
  switch (id) {
    case 'svg':
      return (
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="42.667"
          height="42.667"
          version="1.0"
          viewBox="0 0 32 32"
        >
          <title>camera</title>
          <path d="M5.2 2.2c-1.3 1.3-1.6 5.1-.5 6.2.4.3.6 2.9.4 5.6l-.2 5h3.5c4.2 0 4.3.3 1.6 6.7-1.1 2.6-1.4 4-.6 3 1.9-2.5 3.4-2.1 3.9 1l.4 2.8.2-2.8c.1-3.1 1.7-3.5 3.7-1 .8 1 .5-.4-.6-3-2.6-6.3-2.6-6.7 1.1-6.7 3 0 3 0 2.8-5-.2-2.7 0-5.3.4-5.6 1.1-1.1.8-4.9-.5-6.2-1.5-1.5-5.1-1.5-6.6 0-.9.9-1.5.9-2.4 0C10.3.7 6.7.7 5.2 2.2zM14.5 9c.3.5-.3 1-1.5 1s-1.8-.5-1.5-1c.3-.6 1-1 1.5-1s1.2.4 1.5 1zm-1.9 16.7c-1.1 1.1-1.7-.4-.9-2.3.7-1.8.8-1.8 1.1-.1.2 1 .1 2.1-.2 2.4zm3.4-.5c0 .5-.4.8-1 .8-.5 0-1-1-1-2.3 0-1.8.2-1.9 1-.7.5.8 1 1.8 1 2.2z" />
          <path d="M24.3 10c-3.2 1.3-3 4.8.3 6 3.5 1.4 3.4 1.5 3.4-3 0-4.2-.2-4.4-3.7-3z" />
        </svg>
      );
    default:
      return <svg></svg>;
  }
};

export default SvgIcon;

SvgIcon.propTypes = {
  id: PropTypes.string.isRequired,
};
