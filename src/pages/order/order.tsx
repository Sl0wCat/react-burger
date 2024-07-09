import { FC, useEffect } from 'react';

// Компоненты
import OrderInfo from '../../components/OrderInfo/OrderInfo';

// Стили
import styles from './order.module.css';

// Редьюсеры
import { fetchIngredients } from '../../services/reducers/burgerIngredients';
import { getIngredients, useAppDispatch, useAppSelector } from '../../services/store';
import AppHeader from '../../components/Header/AppHeader';

export const OrderPage: FC = () => {

    const dispatch = useAppDispatch();

    const ingredients = useAppSelector(getIngredients);

    useEffect(() => {
        // Получаем ингридиенты с API если их нет в state
        if (ingredients.length === 0)
            dispatch(fetchIngredients());
      }, [dispatch, ingredients]);

    return (
        <>
            <AppHeader/>
            <div className={styles.wrapper}>
                <div className={styles.orderWrapper}>
                    <OrderInfo/>
                </div>
                
            </div>
            
        </>
        
    );
}
