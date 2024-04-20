import React from 'react';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import styles from './BurgerIngredientCard.module.css';
import PropTypes from 'prop-types';

function BurgerIngredientCard(props) {

  const [showModal, setShowModal] = React.useState(false);   

  return (
    <>
      <div className={styles.ingredientCard + " pr-4 pl-4"}  onClick={() => setShowModal(true)} >
        {props.count > 0 && (
            <Counter count={props.count} size="default" extraClass="m-1" />
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
          <Modal header="Детали ингредиента" onClose={() => setShowModal(false)}> 
              <IngredientDetails {...props} />
          </Modal>
        )}
    </>
    
  );
}

BurgerIngredientCard.propTypes ={
  count: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default BurgerIngredientCard;
