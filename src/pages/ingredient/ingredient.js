import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import AppHeader from '../../components/Header/AppHeader';

// Редьюсеры
import { fetchIngredients } from '../../services/reducers/burgerIngredients.js';

// Стили
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

export function IngredientPage() {

    const dispatch = useDispatch();

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
