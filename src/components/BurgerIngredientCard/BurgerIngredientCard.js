import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredientCard.module.css';
import PropTypes from 'prop-types';

function BurgerIngredientCard(props) {
  return (
    <div className={styles.ingredientCard + " pr-4 pl-4"} >
        {props.count > 0 && (
            <Counter count={props.count} size="default" extraClass="m-1" />
        )}
        <img src={props.img} alt='props.name' />
        <div className={styles.price} >
            {props.price} <CurrencyIcon type="primary" />
        </div>
        <div className={styles.title}>
            {props.name}
        </div>
    </div>
  );
}

BurgerIngredientCard.propTypes ={
  count: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default BurgerIngredientCard;
