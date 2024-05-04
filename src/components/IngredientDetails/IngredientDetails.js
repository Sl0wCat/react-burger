import { useSelector } from 'react-redux';

// Стили
import styles from './IngredientDetails.module.css';

function IngredientDetails() {

    const ingredient = useSelector(state => state.ingredient.item);
    return (
        <div className={styles.ingredientCard + " pr-4 pl-4"} >
            {ingredient.image_large && <img src={ingredient.image_large} alt={ingredient.name} />}
            <div className={styles.title + " pt-4 pb-8 text text_type_main-medium"}>
                {ingredient.name}
            </div>
            <section className={styles.details + " text text_type_main-default text_color_inactive"}>
                <div>
                    Калории, ккал<br /><span className="text_type_digits-default">{ingredient.calories}</span>
                </div>
                <div>
                    Белки, г<br /><span className="text_type_digits-default">{ingredient.proteins}</span>
                </div>
                <div>
                    Жиры, г<br /><span className="text_type_digits-default">{ingredient.fat}</span>
                </div>
                <div>
                    Углеводы, г<br /><span className="text_type_digits-default">{ingredient.carbohydrates}</span>
                </div>
            </section>
        </div>
    );
}

export default IngredientDetails;
