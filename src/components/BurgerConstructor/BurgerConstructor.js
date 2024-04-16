import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';

function BurgerConstructor({products}) {
    const total = products.reduce((acc, p) => acc + p.price, 0);
    return (
        <div className={styles.burgerConstructor + ' mt-25'} style={{  }}>
            {products.map((item, index) => {
                return (index !== 0 && index !== products.length - 1) ? (
                    <div key={item._id + index} className={styles.constructorElement}>
                        <div className={styles.dragIcon}>
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            extraClass='mb-4'
                        />
                    </div>
                ) : (
                    <div key={item._id + index} className={styles.constructorElement}>
                        <ConstructorElement
                            type={index === 0 ? "top" : "bottom"}
                            isLocked={true}
                            text={index === 0 ? item.name + " (верх)" : item.name + " (низ)"}
                            price={item.price}
                            thumbnail={item.image}
                            extraClass='mb-4'
                        />
                    </div>                    
                )
            } )}
            <section className={styles.total + ' pt-10 text text_type_main-large'}>
                {total} <span className='pl-2'><CurrencyIcon type="primary" /></span>
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
}

BurgerConstructor.propTypes ={
    products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BurgerConstructor;
