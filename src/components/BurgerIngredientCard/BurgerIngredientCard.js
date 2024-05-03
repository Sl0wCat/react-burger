import React from 'react';
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

// Комоненты
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

// Стили
import styles from './BurgerIngredientCard.module.css';

// Редьюсеры
import { setIngredient, cleanIngredient } from '../../services/reducers/burgerIngredient';

function BurgerIngredientCard(props) {
  const dispatch = useDispatch();

  const burgerConstructor = useSelector(state => state.burgerConstructor);

  // Количество ингридиента в конструкторе
  const productCount = (props) => {
    const count = props.type === "bun" ? 
      (burgerConstructor.bun && burgerConstructor.bun.name === props.name) ? 2 : 0
      : burgerConstructor.filling.filter((item) => item.name === props.name).length;

    return count;
  }

  const [showModal, setShowModal] = React.useState(false);

  const showIngredient = (props) => {
    dispatch(setIngredient(props));
    setShowModal(true);
  }

  const hideIngredient = () => {
    dispatch(cleanIngredient());
    setShowModal(false);
  }

  const [, dragRef] = useDrag({
      type: "filling",
      item: props
  });

  return (
    <>
      <div ref={dragRef} className={styles.ingredientCard + " pr-4 pl-4"}  onClick={() => showIngredient(props)} >
        {productCount(props) > 0 && (
            <Counter count={productCount(props)} size="default" extraClass="m-1" />
        )}
        <img src={props.image} alt={props.name} />
        <div className={styles.price} >
            {props.price} <CurrencyIcon type="primary" />
        </div>
        <div className={styles.title}>
            {props.name}
        </div>
        
      </div>
      {showModal && (
          <Modal header="Детали ингредиента" onClose={() => hideIngredient()}> 
              <IngredientDetails />
          </Modal>
        )}
    </>
    
  );
}

BurgerIngredientCard.propTypes ={
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default BurgerIngredientCard;
