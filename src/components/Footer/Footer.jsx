import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Footer.module.scss';
import { Context } from '../../App';

const Footer = () => {
  const { filter, setActiveCategory } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const findCategory = (tag) => {
    setActiveCategory(tag);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.item}>
            <span className={styles.number}>СompСompany</span>
            <span className={styles.mail}>compcompany@mail.ru</span>
            <div className={styles.links}>
            </div>
          </div>
          <div className={styles.item}>
            <h2 className={styles.title}>Каталог</h2>
            <ul className={styles.list}>
              {filter.map((obj) => {
                return (
                  <li
                    key={obj.tag}
                    className={styles.listitem}
                    onClick={() => findCategory(obj.tag)}>
                    {obj.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
