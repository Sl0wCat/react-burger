import { FC, ReactElement, useEffect } from 'react';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

// Редьюсеры
import { fetchIngredients } from '../../services/reducers/burgerIngredients';
import { useAppDispatch } from '../../services/store';


export const IngredientPage: FC = (): ReactElement => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        // Получаем ингридиенты с API
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <IngredientDetails/>
        </>
        
    );
}
