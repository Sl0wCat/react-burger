import React, { useCallback } from 'react';
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

// Компоненты
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import BurgerConstructorDragElement from '../BurgerConstructorDragElement/BurgerConstructorDragElement';

// Стили и т.д.
import styles from './BurgerConstructor.module.css';
import noImagePath from '../../images/noImage.png';

// Редьюсеры
import { reorderFilling } from '../../services/reducers/burgerConstructor';
import { fetchOrder, cleanOrder } from '../../services/reducers/order';

// Если нет ингридиентов в конструкторе бургера - отображаем заглушку
const EmptyIngridient = ({text, type = null}) => {
    return (
        <div className={styles.constructorElement}>
            <ConstructorElement
                type={type}
                isLocked={true}
                text={text}
                price="0"
                thumbnail={noImagePath}
                extraClass="mb-4"
            />
        </div>
    )
}

function BurgerConstructor({onDropHandler}) {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector(state => state.burgerConstructor);

    const [, dropTarget] = useDrop({
        accept: "filling",
        drop(item) {
            onDropHandler(item);
        },
    });

    // Итоговая стоимость корзины
    const total = burgerConstructor.total;

    const [showModal, setShowModal] = React.useState(false);

    // Создание заказа и показ модального окна с информацией
    const showOrder = () => {
        // Список ингридиентов
        const ingredients = [
            burgerConstructor.bun._id,
            ...burgerConstructor.filling.map((item) => item._id),
            burgerConstructor.bun._id,
        ];
        dispatch(fetchOrder({ingredients: ingredients}))

        setShowModal(true);
    }
    
    const hideOrder = () => {
        dispatch(cleanOrder());
        setShowModal(false);
    }

    // Перетаскивание ингридиентов внутри конструктора бургера
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = burgerConstructor.filling[dragIndex];
        dispatch(reorderFilling({dragIndex, hoverIndex, dragCard}));
    }, [burgerConstructor, dispatch]);

    return (
        <div ref={dropTarget} className={styles.burgerConstructor + ' mt-25'} >
            { burgerConstructor.bun ? (
                <div className={styles.constructorElement}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={burgerConstructor.bun.name + " (верх)"}
                        price={burgerConstructor.bun.price}
                        thumbnail={burgerConstructor.bun.image}
                        extraClass="mb-4"
                    />
                </div>
            ) : (
                <EmptyIngridient type="top" text="Перетащите сюда булку (верх)" />
            ) }
            

            {burgerConstructor.filling.length > 0 ? burgerConstructor.filling.map((item, index) => {
                return (
                    <BurgerConstructorDragElement key={item._id + index} item={item} index={index} moveCard={moveCard} />
                )
                })
                : 
                <EmptyIngridient text="Перетащите сюда начинку" />
            }
            { burgerConstructor.bun ? (
                <div className={styles.constructorElement}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={burgerConstructor.bun.name + " (низ)"}
                        price={burgerConstructor.bun.price}
                        thumbnail={burgerConstructor.bun.image}
                        extraClass='mb-4'
                    />
                </div>
            ) : (
                <EmptyIngridient type="bottom" text="Перетащите сюда булку (низ)" />
            )}


            <section className={styles.total + ' pt-10 text text_type_main-large'}>
                {total} <span className='pl-2'><CurrencyIcon type="primary" /></span>
                <Button 
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={() => showOrder()}
                    disabled={total === 0 ? true : false}
                >
                    Оформить заказ
                </Button>
            </section>
            {showModal && (
                <Modal header="" onClose={() => hideOrder()}> 
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
}

BurgerConstructor.propTypes ={
    onDropHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor;
