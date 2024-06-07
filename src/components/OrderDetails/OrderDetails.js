import { useSelector } from 'react-redux';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './OrderDetails.module.css';
import { getOrder } from '../../services/store';

function OrderDetails() {
    const order = useSelector(getOrder);
    return(
        <>
            { order.loading ? (
                <section className={styles.order}>
                    <div className="text text_type_main-default pb-8">Загрузка...</div>
                    <p className="text text_type_main-default pb-15">Ваш заказ обрабатывается</p>
                </section>
            ) : order.error ? (
                <section className={styles.order}>
                    <div className="text text_type_digits-large pb-8">Ошибка:(</div>
                    <p className="text text_type_main-default pb-15">идентификатор заказа</p>
                    <p className="text text_type_main-small pt-15 pb-2">Ошибка при создании заказа.</p>
                </section>
            ) : (
                <section className={styles.order}>
                    <div className="text text_type_digits-large pb-8">{order.order.number}</div>
                    <p className="text text_type_main-default pb-15">идентификатор заказа</p>
                    <CheckMarkIcon type="primary" />
                    <p className="text text_type_main-small pt-15 pb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-small text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
                </section>
            )}
        </>
    );
}

export default OrderDetails;