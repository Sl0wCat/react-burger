import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

// Стили
import styles from './BurgerConstructorDragElement.module.css';

// Редьюсеры
import { removeFilling, countTotal, updateIndex } from '../../services/reducers/burgerConstructor';

function BurgerConstructorDragElement({item, index, moveCard}) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const itemId = item._id + index;

    const [{ handlerId }, dropTargetConstructor] = useDrop({
        accept: "fillingOrder",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, dragRefConstructor] = useDrag({
        type: "fillingOrder",
        item: () => {
            return { itemId, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.5 : 1;
    

    const handleClose = (item) => {
        dispatch(removeFilling(item));
        dispatch(updateIndex())
        dispatch(countTotal());
    }

    dragRefConstructor(dropTargetConstructor(ref));

    return (
        <div  className={styles.constructorElement} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            <div className={styles.dragIcon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass='mb-4'
                handleClose={() => handleClose(item)}
            />
        </div>
    );
}

BurgerConstructorDragElement.propTypes = {
    item: PropTypes.object.isRequired, 
    index: PropTypes.number.isRequired, 
    moveCard: PropTypes.func.isRequired,
};

export default BurgerConstructorDragElement;