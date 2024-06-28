import { FC, ReactElement } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// Стили
import styles from './OrderIngredient.module.css';

// Типы
import { TIngredient } from "../../utils/types";


type TOrderIngredient = {
    ingredient: TIngredient,
    text?: string | undefined,
    mini: boolean
}

type TIngredientImage = {
    image: string;
    alt: string;
    text?: string | undefined;
    mini: boolean;
}

const IngredientImage: FC<TIngredientImage> = ({image, alt, text, mini}) : ReactElement => {
    return(
        <div className={`${styles.wrapper} ${mini ? styles.wrapperMarginLeft : styles.wrapperMarginRight}`}>
            <div className={styles.innerWrapper}>
                <img src={image} alt={alt} className={styles.image}/>
                {text && <span className={styles.text}>{text}</span>}
            </div>
            
        </div>
    )
}

const OrderIngredient: FC<TOrderIngredient> = ({ingredient, text, mini = true}): ReactElement => {
    return(
        <>
            {mini ? (
                <>
                    {ingredient && <IngredientImage image={ingredient.image} alt={ingredient.name} text={text} mini />}
                </>
                
            ) : (
                <div className={`${styles.rowWrapper} pb-4`}>
                    {ingredient && 
                        <>
                            <div className={styles.subrowWrapper}>
                                <IngredientImage image={ingredient.image} alt={ingredient.name} text={text} mini={false} />
                                {ingredient.name}
                            </div>
                            <div className="text text_type_digits-default">
                                {ingredient.count} x {ingredient.price} <CurrencyIcon type='primary' />
                            </div>
                        </>
                        
                    }
                </div>
            )}
        </>
        
        
    );
}

export default OrderIngredient;