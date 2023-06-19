import React, { useState } from 'react';

import styles from './SearchBlock.module.scss';
import arrowimg from '../../assets/img/arrow.svg';

const SearchBlock = ({ sortValue, onClickSort, searchValue, onChangeSearch }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const sortMethdos = [
    { name: 'По возрастанию', tag: 'price' },
    { name: 'По убыванию', tag: '-price' },
  ];

  const selectSort = (obj) => {
    onClickSort(obj);
    setOpenPopup(false);
  };

  return (
    <div className={styles.searchblock}>
      <div className={styles.search}>
        <input
          onChange={(e) => onChangeSearch(e.target.value)}
          value={searchValue}
          type="text"
          placeholder="Поиск"
        />
      </div>
      <div className={styles.sortbox}>
        <div onClick={() => setOpenPopup(!openPopup)} className={styles.sort}>
          <img src={arrowimg} className={openPopup ? styles.arrow_open : ''} alt="" />
          <span>{sortValue.name}</span>
        </div>
        {openPopup && (
          <>
            <div className={styles.popup}>
              <ul>
                {sortMethdos.map((obj, i) => {
                  return (
                    <li key={i} onClick={() => selectSort(obj)}>
                      {obj.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBlock;
