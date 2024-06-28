import { FC, useEffect } from "react";

// Компоненты
import OrderListElement from "../../components/OrderListElement/OrderListElement";

// Стили
import styles from './styles.module.css';

// Хранилище, типы и т.д.
import { getIngredients, getUserOrdersList, useAppDispatch, useAppSelector } from "../../services/store";
import { wsConnect, wsDisconnect } from "../../services/middleware/actions";
import { BASE_WS_USER_URL } from "../../utils";
import { IOrder } from "../../utils/types";
import { fetchIngredients } from "../../services/reducers/burgerIngredients";


export const OrdersPage: FC = () => {
    const dispatch = useAppDispatch();

    const ingredients = useAppSelector(getIngredients);

    useEffect(() => {
        // Получаем ингридиенты с API если их нет в state
        if (ingredients.length === 0)
            dispatch(fetchIngredients());
    }, [dispatch, ingredients]);

    useEffect(() => {
        // Подключаемся к WebSocket
        const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
        dispatch(wsConnect(`${BASE_WS_USER_URL}?token=${token}`));
        return () => {
            dispatch(wsDisconnect());
        }
    }, [dispatch]);

    const orders = useAppSelector(getUserOrdersList);

    return (
        <>
            <div className={`${styles.innerWrapper} text text_type_main-default`}>
                {orders && orders.map((order: IOrder) => (
                    <OrderListElement order={order} showStatus key={order._id}/>
                ))}
            </div>
        </>
    )
}