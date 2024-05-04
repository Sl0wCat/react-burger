import { useCallback } from 'react';
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

// Компоненты
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import BurgerConstructorDragElement from '../BurgerConstructorDragElement/BurgerConstructorDragElement';

// Хуки
import { useModal } from '../../hooks/useModal';

// Стили и т.д.
import styles from './BurgerConstructor.module.css';
import noImagePath from '../../images/noImage.png';

// Редьюсеры
import { addFilling, addBun, countTotal, reorderFilling, updateIndex, cleanConstructor } from '../../services/reducers/burgerConstructor';
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

function BurgerConstructor() {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector(state => state.burgerConstructor);
    const order = useSelector(state => state.order);

    const { isModalOpen, openModal, closeModal } = useModal();

    // Перетаскивание ингридиента в конструктор бургеров
    const handleDrop = (item) => {
        // В зависимости от типа продукта добавляем его в список начинок или ставим булкой
        item.type === "bun" ? dispatch(addBun(item)) : dispatch(addFilling(item));
        // Обновляем итоговую стоимость
        dispatch(countTotal());
    };

    const [, dropTarget] = useDrop({
        accept: "filling",
        drop(item) {
            handleDrop(item);
        },
    });

    // Итоговая стоимость корзины
    const total = burgerConstructor.total;

    // Создание заказа и показ модального окна с информацией
    const showOrder = () => {
        // Список ингридиентов
        const ingredients = [
            burgerConstructor.bun._id,
            ...burgerConstructor.filling.map((item) => item._id),
            burgerConstructor.bun._id,
        ];
        dispatch(fetchOrder({ingredients: ingredients}))
        openModal();
        if (!order.error)
            dispatch(cleanConstructor());
    }
    
    const hideOrder = () => {
        dispatch(cleanOrder());
        closeModal();
    }

    // Перетаскивание ингридиентов внутри конструктора бургера
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = burgerConstructor.filling[dragIndex];
        dispatch(reorderFilling({dragIndex, hoverIndex, dragCard}));
        dispatch(updateIndex())
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
                    <BurgerConstructorDragElement key={item.uId} item={item} index={index} moveCard={moveCard} />
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
            {isModalOpen && (
                <Modal header="" onClose={() => hideOrder()}> 
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
}

export default BurgerConstructor;
