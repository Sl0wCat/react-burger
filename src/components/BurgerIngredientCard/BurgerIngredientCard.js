import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

// Комоненты
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

// Хуки
import { useModal } from '../../hooks/useModal';

// Стили
import styles from './BurgerIngredientCard.module.css';

// Редьюсеры
import { setIngredient, cleanIngredient } from '../../services/reducers/burgerIngredient';

function BurgerIngredientCard({ingredient}) {
  const dispatch = useDispatch();

  const burgerConstructor = useSelector(state => state.burgerConstructor);

  const { isModalOpen, openModal, closeModal } = useModal();

  // Количество ингридиента в конструкторе
  const productCount = (ingredient) => {
    const count = ingredient.type === "bun" ? 
      (burgerConstructor.bun && burgerConstructor.bun.name === ingredient.name) ? 2 : 0
      : burgerConstructor.filling.filter((item) => item.name === ingredient.name).length;

    return count;
  }

  const showIngredient = (ingredient) => {
    dispatch(setIngredient(ingredient));
    openModal();
  }

  const hideIngredient = () => {
    dispatch(cleanIngredient());
    closeModal();
  }

  const [, dragRef] = useDrag({
      type: "filling",
      item: ingredient
  });

  return (
    <>
      <div ref={dragRef} className={styles.ingredientCard + " pr-4 pl-4"}  onClick={() => showIngredient(ingredient)} >
        {productCount(ingredient) > 0 && (
            <Counter count={productCount(ingredient)} size="default" extraClass="m-1" />
        )}
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={styles.price} >
            {ingredient.price} <CurrencyIcon type="primary" />
        </div>
        <div className={styles.title}>
            {ingredient.name}
        </div>
        
      </div>
      {isModalOpen && (
          <Modal header="Детали ингредиента" onClose={() => hideIngredient()}> 
              <IngredientDetails />
          </Modal>
        )}
    </>
    
  );
}

BurgerIngredientCard.propTypes ={
  ingredient: PropTypes.object.isRequired,
};

export default BurgerIngredientCard;
