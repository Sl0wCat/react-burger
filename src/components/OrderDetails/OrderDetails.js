import React from "react";
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './OrderDetails.module.css';



function OrderDetails(props) {
    return(
        <section className={styles.order}>
            <div className="text text_type_digits-large pb-8">{props.number}</div>
            <p className="text text_type_main-default pb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-small pt-15 pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
        </section>
    );
}

OrderDetails.propTypes ={
    number: PropTypes.string.isRequired,
};

export default OrderDetails;