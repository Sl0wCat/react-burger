import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Стили
import styles from './BurgerConstructorDragElement.module.css';

// Редьюсеры
import { removeFilling, countTotal, updateIndex } from '../../services/reducers/burgerConstructor';

// Типы
import { TIngredient } from '../../utils/types';
import { useAppDispatch } from '../../services/store';

type TBurgerConstructorDragElement = {
    item: TIngredient;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

type draggableItemIdentifiers = {
    key: string;
    index: number;
  }

const BurgerConstructorDragElement: FC<TBurgerConstructorDragElement> = ({item, index, moveCard}) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

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
            const dragIndex = (item as draggableItemIdentifiers).index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            
            const clientOffset = monitor.getClientOffset();
            if (!!clientOffset) {
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }

                moveCard(dragIndex, hoverIndex);

                (item as draggableItemIdentifiers).index = hoverIndex;
            }
            
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
    

    const handleClose = (item: TIngredient) => {
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


export default BurgerConstructorDragElement;