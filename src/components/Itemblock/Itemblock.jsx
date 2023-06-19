import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Itemblock.module.scss';
import { Context } from '../../App';

const Itemblock = (props) => {
  const { cart, setCart, isAuth } = useContext(Context);

 
  return (
    <div className={styles.root}>
      <div className={styles.imgBox}>
        <img src={props.imgUrl} alt="" />
      </div>
      <div className={styles.info}>
        <Link to={`/products/${props._id}`} className={styles.title}>
          {props.title}
        </Link>
        <div className={styles.price}>{props.price} ₽</div>
        
        
      </div>
      {cart.findIndex((item) => item._id === props._id) === -1 ? (
        isAuth ? (
          <button
            onClick={() =>
              setCart([
                ...cart,
                {
                  ...props,
                  priceFinal: props.price,
                  count: 1,
                },
              ])
            }
            className={styles.btn}>
            В корзину
          </button>
        ) : (
          <Link className={styles.btn} to={'/login'}>
            В корзину
          </Link>
        )
      ) : (
        <Link className={[styles.btn, styles.confBtn].join(' ')} to={'/cart'}>
          В корзине
        </Link>
      )}
    </div>
  );
};

export default Itemblock;
