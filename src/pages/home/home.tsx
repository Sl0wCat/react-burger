import { FC, useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Компоненты
import AppHeader from '../../components/Header/AppHeader';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

// Стили
import styles from './home.module.css';

// Редьюсеры
import { fetchIngredients } from '../../services/reducers/burgerIngredients';
import { useAppDispatch } from '../../services/store';



export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Получаем ингридиенты с API
    dispatch(fetchIngredients());
  }, [dispatch]);

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
