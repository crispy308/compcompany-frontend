import React from 'react';

import styles from './NotFoundPage.module.scss';

import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={styles.main}>
      <span>Ошибка 404</span>
      <span>Страница не найдена</span>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
