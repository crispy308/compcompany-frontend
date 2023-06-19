import React, { useContext, useEffect, useState } from 'react';

import SearchBlock from '../components/SearchBlock/SearchBlock';
import Filter from '../components/Filter/Filter';
import Booklist from '../components/Itemlist/Itemlist';
import { Context } from '../App';

const Home = () => {
  const { activeCategory, setActiveCategory } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState({ name: 'По возрастанию', tag: 'price' });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL || "http://localhost:4000" }/products?search=${searchValue}&sort=${selectedSort.tag}&category=${activeCategory}`,
    )
      .then((res) => res.json())
      .then((result) => setProducts(result));
  }, [activeCategory, selectedSort, searchValue]);

  return (
    <main className='main__wrapper'>
      <div className='sidebar'>
        <SearchBlock
          sortValue={selectedSort}
          onClickSort={(obj) => setSelectedSort(obj)}
          searchValue={searchValue}
          onChangeSearch={(value) => setSearchValue(value)}
        />
        <Filter value={activeCategory} onClickCategory={(tag) => setActiveCategory(tag)} />
        
      </div>
      <div className='rightbar'>
        <Booklist books={products} />
      </div>
    </main>
  );
};

export default Home;
