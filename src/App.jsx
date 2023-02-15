import UserRoutes from 'components/UserRoutes';

import Header from 'components/Header/Header';

import styles from './App.module.scss';
export default function App() {
  return (
    <div className={styles.container}>
      <Header />
      <UserRoutes />
    </div>
  );
}
