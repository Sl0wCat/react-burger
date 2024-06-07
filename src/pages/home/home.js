import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDispatch } from 'react-redux';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

// Стили
import styles from './home.module.css';

// Редьюсеры
import { fetchIngredients } from '../../services/reducers/burgerIngredients.js';



export function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Получаем ингридиенты с API
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
        <AppHeader />
        <div className={styles.wrapper + " text text_type_main-default"}>
          
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <section className={styles.column}>
                <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
                <BurgerIngredients />
              </section>
              <section className={styles.column}>
                <BurgerConstructor />
              </section>
            </DndProvider>
          </main>
          
        </div>
    </>
    
  );

}
