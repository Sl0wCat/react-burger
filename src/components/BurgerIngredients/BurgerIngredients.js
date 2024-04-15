import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css';
import BurgerIngredientCard from '../BurgerIngredientCard/BurgerIngredientCard';
import PropTypes from 'prop-types';

function BurgerIngredients({cartProducts}) {
  const [current, setCurrent] = React.useState('bun');

  const ingredients = require('../../utils/data.json');
  const tabs = [
    {
        title: 'Булки',
        code: 'bun',
    },
    {
        title: 'Соусы',
        code: 'sauce',
    },
    {
        title: 'Начинки',
        code: 'main',
    }
  ];

  const productCount = (product) => {
    const count = cartProducts.filter((item) => item.name === product.name).length;
    return count;
  }
  return (
    <>
      <section className={styles.tabs}>
        {tabs.map((item) => (
            <Tab value={item.code} active={current === item.code} onClick={setCurrent} key={item.code}>
                {item.title}
            </Tab> 
        ))}
      </section>
      
      <section className={styles.items}>
        {tabs.map((item) => (
          <section key={item.code}>
            <h2 className='pt-6 pb-10'>{item.title}</h2>
            { ingredients.filter((ingredient) => ingredient.type === item.code).map((item) => (
              <BurgerIngredientCard name={item.name} img={item.image} price={item.price} count={productCount(item)} key={item._id}/>
            )) }
          </section>
        ))}
      </section>
    </>
  );
}

BurgerIngredients.propTypes ={
  cartProducts: PropTypes.arrayOf(PropTypes.object)
};

export default BurgerIngredients;
