import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

// Стили
import styles from './BurgerIngredientCard.module.css';

function BurgerIngredientCard({ingredient}) {
  const burgerConstructor = useSelector(state => state.burgerConstructor);

  // Количество ингридиента в конструкторе
  const productCount = (ingredient) => {
    const count = ingredient.type === "bun" ? 
      (burgerConstructor.bun && burgerConstructor.bun.name === ingredient.name) ? 2 : 0
      : burgerConstructor.filling.filter((item) => item.name === ingredient.name).length;

    return count;
  }

  const [, dragRef] = useDrag({
      type: "filling",
      item: ingredient
  });

  const location = useLocation();

  return (
    <>
      <div ref={dragRef} className={styles.ingredientCard + " pr-4 pl-4"} >
        <Link
          to={`/ingredients/${ingredient._id}`}
          state={{backgroundLocation: location}}
          className={styles.link}
        >
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
        </Link>
      </div>
    </>
  );
}

BurgerIngredientCard.propTypes ={
  ingredient: PropTypes.object.isRequired,
};

export default BurgerIngredientCard;
