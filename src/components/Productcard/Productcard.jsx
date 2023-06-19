import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './Productcard.module.scss';
import { Context } from '../../App';

const Productcard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cart, setCart, isAuth } = useContext(Context);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      let product = await fetch(`${process.env.REACT_APP_SERVER_URL}/products/${id}`);
      product = await product.json();
      if (product.error) {
        navigate('/notfound');
      }
      setProduct(product);
    };
    fetchUser();
  }, [id]);

  return (
    <>
      <Link to={'/'} className={styles.backBtn}>
        Назад
      </Link>

      {product._id && (
        <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.imgBox}>
              <img src={product.imgUrl} alt="" />
            </div>
            <div className={styles.titleBox}>
              <h2 className={styles.title}>{product.title}</h2>
              
              <div className={styles.description}>
            <h3>Описание</h3>
            <div className={styles.descBody}>{product.description}</div>
          </div>
            </div>
            <div className={styles.priceBox}>
              <p className={styles.price}>Цена: {product.price} ₽</p>
              {cart.findIndex((obj) => obj._id === product._id) === -1 ? (
                isAuth ? (
                  <button
                    className={styles.btn}
                    onClick={() =>
                      setCart([
                        ...cart,
                        {
                          ...product,
                          count: 1,
                          priceFinal: product.price,
                          
                        },
                      ]) 
                    }>
                    Купить
                  </button>
                ) : (
                  <Link className={styles.btn} to={'/login'}>
                    Купить
                  </Link>
                )
              ) : (
                <Link className={styles.confButton} to="/cart">
                  В корзине
                </Link>
              )}
            </div>
          </div>
          <h3>Общая характеристика</h3>
            <span>Заводские данные</span>
              <ul>
                <li>
                  <p>
                    <p>Год выпуска: </p>
                    <p>{product.year}</p>
                  </p>
                  <p>
                    <p>Страна производитель: </p>
                    <p>{product.maker}</p>
                  </p>
                  <p>
                    <p>Гарантия производителя: </p>
                    <p>{product.guarantee}</p>
                  </p>
                </li>
              </ul>

              <span>Общие параметры</span>
              <ul>
                <li>
                  <p>
                    <p>Тип: </p>
                    <p>{product.type}</p>
                  </p>
                  <p>
                    <p>Модель: </p>
                    <p>{product.model}</p>
                  </p>
                </li>
              </ul>
        </div>
      )}
    </>
  );
};

export default Productcard;
