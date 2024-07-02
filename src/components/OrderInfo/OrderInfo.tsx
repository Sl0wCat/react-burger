import { useParams } from 'react-router-dom';
import { FC, ReactElement } from 'react';

// Компоненты
import OrderIngredient from '../OrderIngredient/OrderIngredient';

// Стили
import styles from './OrderInfo.module.css';

// Редьюсеры, типы
import { getOrderInfo, getOrderInfoError, getOrderInfoFetching, getOrderIngredients, useAppDispatch, useAppSelector } from '../../services/store';
import { fetchOrderInfo } from '../../services/reducers/order';
import { TIngredient, orderStatus, orderStatusText } from '../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo: FC = (): ReactElement => {
    const {number} = useParams();
    console.log(number);

    const dispatch = useAppDispatch();

    let order = useAppSelector(getOrderInfo(Number(number) ));
    const orderFetching = useAppSelector(getOrderInfoFetching);
    const orderError = useAppSelector(getOrderInfoError);
    if (!order && !orderFetching && !orderError) {
        dispatch(fetchOrderInfo(Number(number)));
    }

    const ingredientIds = order ? order.ingredients : [];

    const orderIngredients = useAppSelector(getOrderIngredients(ingredientIds));

    const total = orderIngredients ? Object.entries(orderIngredients).reduce((acc, p) => acc + p[1].price * p[1].count!, 0) : 0;

    return(
        <>
            {order && (
                <>
                    <p className={`${styles.center} text text_type_digits-default`}>#{order.number}</p>
                    <section className='text text_type_main-medium pt-10 pb-3'>{order.name}</section>
                    <p className={`text text_type_main-small mb-15 ${order.status === orderStatus.done ? styles.green : ''}`}>
                        {orderStatusText[order.status]}
                    </p>
                    <p className='text text_type_main-medium mb-6'>Состав:</p>
                    {
                        orderIngredients && Object.entries(orderIngredients).map((ingredient, index) => {
                            return (
                                <OrderIngredient ingredient={ingredient[1] as TIngredient} mini={false} key={index}/>
                            )
                        })
                    }
                    <div className={`${styles.row} mt-10`}>
                        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
                        <div className='text text_type_digits-default'>
                            {total} <CurrencyIcon type='primary' />
                        </div>
                    </div>
                </>
                
            )}
            
        </>
        
    );
}

export default OrderInfo;