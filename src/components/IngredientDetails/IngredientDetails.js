import React from 'react';

import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

function IngredientDetails(props) {

  
  return (
    <div className={styles.ingredientCard + " pr-4 pl-4"} >
        <img src={props.image_large} alt={props.name} />
        <div className={styles.title + " pt-4 pb-8 text text_type_main-medium"}>
            {props.name}
        </div>
        <section className={styles.details + " text text_type_main-default text_color_inactive"}>
            <div>
                Калории, ккал<br /><span className="text_type_digits-default">{props.calories}</span>
            </div>
            <div>
                Белки, г<br /><span className="text_type_digits-default">{props.proteins}</span>
            </div>
            <div>
                Жиры, г<br /><span className="text_type_digits-default">{props.fat}</span>
            </div>
            <div>
                Углеводы, г<br /><span className="text_type_digits-default">{props.carbohydrates}</span>
            </div>
        </section>
    </div>
  );
}

IngredientDetails.propTypes ={
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
};

export default IngredientDetails;
