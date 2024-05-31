import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

// Компоненты
import BurgerIngredientCard from '../BurgerIngredientCard/BurgerIngredientCard';

// Стили
import styles from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const ingredients = useSelector(state => state.ingredients.data);

  const [current, setCurrent] = React.useState('bun');

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

  const onScroll = ({ target }) => {
    // Y родительского контейнера
    const yParent = target.getBoundingClientRect().y;
    // Вычисляем Y контейнеров с элементами, расстояние от них до элемента меню,
    // выбираем наименьшее расстояние - активный элемент
    const distance = tabs.map((item) => 
      {
        const yChild = document.querySelector(`#${item.code}`).getBoundingClientRect().y;
        return {
          id: item.code, 
          distance: Math.abs(yParent - yChild)
        }
    }).sort((a, b) => a.distance - b.distance);

    setCurrent(distance[0].id);
  }

  const menuSelect = (tab) => {
    document.getElementById("scrollWrapper").scrollTop = document.querySelector(`#${tab}`).offsetTop - 240;
  };
  
  return (
    <>
      <section className={styles.tabs}>
        {tabs.map((item) => (
            <Tab value={item.code} active={current === item.code} onClick={menuSelect} key={item.code}>
                {item.title}
            </Tab> 
        ))}
      </section>
      
      <section className={styles.items} id="scrollWrapper" onScroll={ onScroll }>
        {tabs.map((item) => (
            <section key={item.code} id={item.code}>
              <h2 className="pt-6 pb-10">{ item.title }</h2>
              {ingredients.filter((ingredient) => ingredient.type === item.code).map((ingredient) => (
                <BurgerIngredientCard ingredient={ingredient} key={ingredient._id}/>
              ))}
            </section>

        ))}
      </section>
    </>
  );
}

export default BurgerIngredients;
