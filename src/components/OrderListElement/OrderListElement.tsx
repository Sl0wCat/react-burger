
import { FC } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

// Компоненты
import OrderIngredient from '../OrderIngredient/OrderIngredient';

// Стили
import styles from './OrderListElement.module.css';

// Типы
import { IOrder, TIngredient, orderStatus, orderStatusText } from '../../utils/types';

// Хранилище
import { getOrderIngredients, useAppSelector } from '../../services/store';


type TOrderListElement = {
    order: IOrder;
    showStatus?: boolean;
}

const OrderListElement: FC<TOrderListElement> = ({order, showStatus = false}) => {

    const orderIngredients = useAppSelector(getOrderIngredients(order.ingredients));

    const maxIngredientsNumber = 6;

    const total = orderIngredients ? Object.entries(orderIngredients).reduce((acc, p) => acc + p[1].price * p[1].count!, 0) : 0;

    const location = useLocation();


    return(
        <div className={`${styles.elementWrapper} mt-6 mb-6 p-6`}>
            <Link
                to={`${location.pathname}/${order.number}`}
                state={{backgroundLocation: location}}
                className={styles.link}
            >
                <div className={styles.info}>
                    <span className='text text_type_digits-default'>#{order.number}</span>
                    <span className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(order.createdAt)} /></span>
                </div>
                <p className='text text_type_main-medium mt-4 mb-4'>{order.name}</p>
                {showStatus && (
                    <p className={`text text_type_main-small mt-4 mb-4 ${order.status === orderStatus.done ? styles.green : ''}`}>
                        {orderStatusText[order.status]}
                    </p>
                )}
                <div className={styles.ingredientsWrapper}>

                    <div className={styles.ingredients}>
                        {orderIngredients && Object.entries(orderIngredients).map((ingredient: [string, TIngredient], index: number) => (
                            index < maxIngredientsNumber ? (
                                <OrderIngredient ingredient={ingredient[1]} key={index} mini/>
                            ) : index === maxIngredientsNumber ? (
                                <OrderIngredient ingredient={ingredient[1]} text={`+${Object.keys(orderIngredients).length - maxIngredientsNumber}`} mini key={index}/>
                            ) : (<></>)
                            
                        ))}
                    </div>
                    <div className={`${styles.price} text text_type_digits-default`}>
                        {total} <CurrencyIcon type='primary' />
                    </div>
                </div>
            </Link>
            
            
        </div>
    );
}

export default OrderListElement;