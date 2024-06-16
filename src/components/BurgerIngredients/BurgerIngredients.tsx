import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

// Компоненты
import BurgerIngredientCard from '../BurgerIngredientCard/BurgerIngredientCard';

// Редьюсеры
import { getIngredients, useAppSelector } from '../../services/store';

// Стили
import styles from './BurgerIngredients.module.css';

//Типы
import { TIngredient } from '../../utils/types';

const BurgerIngredients: FC = () => {
  const ingredients = useAppSelector(getIngredients);

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

  const onScroll = ( e: React.UIEvent<HTMLElement> ): void => {
    const target = e.target as HTMLElement;
    // Y родительского контейнера
    const yParent = target.getBoundingClientRect().y;
    // Вычисляем Y контейнеров с элементами, расстояние от них до элемента меню,
    // выбираем наименьшее расстояние - активный элемент
    const distance = tabs.map((item) => 
      {
        const elem = document.querySelector(`#${item.code}`);
        const yChild = (elem as HTMLElement).getBoundingClientRect().y;
        return {
          id: item.code, 
          distance: Math.abs(yParent - yChild)
        }
    }).sort((a, b) => a.distance - b.distance);

    setCurrent(distance[0].id);
  }

  const menuSelect = (tab: string) => {
    const scrollElem = document.getElementById("scrollWrapper");
    const tabElem = document.querySelector(`#${tab}`);
    (scrollElem as HTMLElement).scrollTop = (tabElem as HTMLElement).offsetTop - 240;
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
              {ingredients.filter((ingredient: TIngredient) => ingredient.type === item.code).map((ingredient: TIngredient) => (
                <BurgerIngredientCard ingredient={ingredient} key={ingredient._id}/>
              ))}
            </section>

        ))}
      </section>
    </>
  );
}

export default BurgerIngredients;
