import { useParams } from 'react-router-dom';
import { FC } from 'react';

// Стили
import styles from './IngredientDetails.module.css';

// Компоненты
import { NotFound404 } from '../../pages';

// Редьюсеры
import { getIngredient, useAppSelector } from '../../services/store';

const IngredientDetails: FC = () => {

    const {id} = useParams();

    const ingredient = useAppSelector(getIngredient(id as string));

    return (
        <>
            {ingredient ? (
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
            ) : (
                <NotFound404 />
            ) }
        </>
        
        
    );
}

export default IngredientDetails;
