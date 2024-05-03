import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.js';
import { useDispatch } from 'react-redux';

// Компоненты
import AppHeader from '../Header/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';

// Стили
import styles from './App.module.css';

// Редьюсеры
import { fetchIngredients } from '../../services/reducers/burgerIngredients.js';
import { addFilling, addBun, countTotal } from '../../services/reducers/burgerConstructor';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Получаем ингридиенты с API
    dispatch(fetchIngredients());
  }, [dispatch]);

  // Перетаскивание ингридиента в конструктор бургеров
  const handleDrop = (item) => {
    // В зависимости от типа продукта добавляем его в список начинок или ставим булкой
    item.type === "bun" ? dispatch(addBun(item)) : dispatch(addFilling(item));
    // Обновляем итоговую стоимость
    dispatch(countTotal());
  };


  return (
    <ErrorBoundary>
        <div className={styles.wrapper + " text text_type_main-default"}>
          <AppHeader />
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <section className={styles.column}>
                <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
                <BurgerIngredients />
              </section>
              <section className={styles.column}>
                <BurgerConstructor onDropHandler={handleDrop} />
              </section>
            </DndProvider>
          </main>
          <div id="react-notifications"></div>
        </div>
    </ErrorBoundary>
    
  );

}
export default App;