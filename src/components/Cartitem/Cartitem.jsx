import React, { useContext } from 'react';

import styles from './Cartitem.module.scss';
import Counter from '../Counter/Counter';
import delIcon from '../../assets/img/delete.svg';
import { Context } from '../../App';
import { Link } from 'react-router-dom';

const CartItem = ({ _id, title, price, imgUrl, count, priceFinal }) => {
  const { cart, setCart } = useContext(Context);

  const handleCartChange = (value) => {
    const currIndex = cart.findIndex((obj) => obj._id === _id);
    setCart(
      cart.map((obj) =>
        obj._id === cart[currIndex]._id ? { ...obj, count: value, priceFinal: price * value } : obj,
      ),
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.imgBox}>
          <img src={imgUrl} alt="" />
        </div>

        <div className={styles.info}>
          <Link to={`/products/${_id}`}>{title}</Link>
        </div>
      </div>
      <div className={styles.btns}>
        <Counter count={count} onChange={handleCartChange} />
        <div className={styles.price}>{priceFinal} ₽</div>
      </div>
      <div onClick={() => setCart(cart.filter((obj) => obj._id !== _id))} className={styles.del}>
        <div>Удалить</div>
      </div>
    </div>
  );
};

export default CartItem;
