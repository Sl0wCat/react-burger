import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from "react-router-dom";
import { FC, ReactElement } from "react";

// Редьюсеры
import { getConstructor, useAppSelector } from "../../services/store";

// Типы
import { TIngredient } from "../../utils/types";

// Стили
import styles from './BurgerIngredientCard.module.css';

type TBurgerIngredientCard = {
  ingredient: TIngredient,
}

const BurgerIngredientCard: FC<TBurgerIngredientCard> = ({ingredient}): ReactElement => {
  const burgerConstructor = useAppSelector(getConstructor);

  // Количество ингридиента в конструкторе
  const productCount = (ingredient: TIngredient) => {
    const count = ingredient.type === "bun" ? 
      (burgerConstructor.bun && burgerConstructor.bun.name === ingredient.name) ? 2 : 0
      : burgerConstructor.filling.filter((item: TIngredient) => item.name === ingredient.name).length;

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

export default BurgerIngredientCard;
