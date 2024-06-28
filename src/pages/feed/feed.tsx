import { FC, ReactElement, useEffect } from "react";

// Компоненты
import AppHeader from "../../components/Header/AppHeader";
import OrderListElement from "../../components/OrderListElement/OrderListElement";

// Стили
import styles from './feed.module.css';

// Хранилище, типы, редьюсеры
import { getIngredients, getOrdersByStatus, getOrdersList, getOrdersTodayCount, getOrdersTotalCount, useAppDispatch, useAppSelector } from "../../services/store";
import { IOrder, orderStatus } from "../../utils/types";
import { fetchIngredients } from "../../services/reducers/burgerIngredients";
import { BASE_WS_URL } from "../../utils";
import { wsConnect, wsDisconnect } from "../../services/middleware/actions";

interface IColumn {
    items: Array<IOrder> | null,
    count: number
}

// Если нет ингридиентов в конструкторе бургера - отображаем заглушку
const Column: FC<IColumn> = ({items, count}) : ReactElement => {
    if (!items) {
        return <div className={styles.columnMin}></div>;
    }
    const colNumbers = Math.ceil(items.length / count);
    let columns: Array<Array<number>> = [];
    for (let i = 0; i < colNumbers; i++) {
        columns.push([]);
        for (let j = 0; j < count; j++) {
            if (items[i * count + j]) {
                columns[i].push(items[i * count + j].number);
            }
            
        }
    }
    return (
        <>
            {columns && columns.map((column: Array<number>, index: number) => {
                return (
                    <div className={styles.columnMin} key={index}>
                        {column.map((orderNumber: number, index: number) => {
                            return (
                                <div key={index}>{orderNumber}</div>
                            )
                        })}
                    </div>
                )
            })}
        </>
    )
}

export const FeedPage: FC = (): ReactElement => {
    const dispatch = useAppDispatch();

    const ingredients = useAppSelector(getIngredients);
    const ordersDone = useAppSelector(getOrdersByStatus(orderStatus.done));
    const ordersPending = useAppSelector(getOrdersByStatus(orderStatus.pending));
    const total = useAppSelector(getOrdersTotalCount);
    const today = useAppSelector(getOrdersTodayCount);

    useEffect(() => {
        // Получаем ингридиенты с API если их нет в state
        if (ingredients.length === 0)
            dispatch(fetchIngredients());
      }, [dispatch, ingredients]);

    useEffect(() => {
        // Подключаемся к websocket
        dispatch(wsConnect(BASE_WS_URL));
        return () => {
            dispatch(wsDisconnect());
        }
      }, [dispatch]);

    const orders = useAppSelector(getOrdersList);
    return (
        <>
            <AppHeader />
            
            <div className={styles.wrapper + " text text_type_main-default"}>
                <h1 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h1>
                <main className={styles.main}>
                    <section className={styles.column}>
                        {orders && orders.map((order: IOrder) => (
                            <OrderListElement order={order} key={order._id}/>
                        ))}
                    </section>
                    <section className={styles.column}>
                        <div className={`${styles.main}  pb-15`}>
                            <div className={`${styles.columnMin}  text text_type_main-default`}>
                                <div className={`${styles.title} pb-6`} >Готовы:</div>
                                <div className={`${styles.main} ${styles.green} text text_type_digits-default`}>
                                    <Column items={ordersDone} count={10} />
                                </div>
                                
                            </div>
                            <div className={`${styles.columnMin} `}>
                                <div className={`${styles.title} pb-6`} >В работе:</div>
                                <div className={`${styles.main} text text_type_digits-default`}>
                                    <Column items={ordersPending} count={10} />
                                </div>
                                
                            </div>
                        </div>

                        <p>Выполено за все время:</p>
                        <p className="text text_type_digits-large pb-15">{total}</p>
                        <p>Выполенно за сегодня:</p>
                        <p className="text text_type_digits-large pb-15">{today}</p>
                    </section>
                </main>
            </div>
        </>
    )
}