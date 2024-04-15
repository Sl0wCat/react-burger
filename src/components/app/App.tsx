import AppHeader from '../Header/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';

function App() {
  const state = {
    cartProducts: [
      {
        "name":"Краторная булка N-200i",
        "price":1255,
        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      },
      {
        "name":"Соус традиционный галактический",
        "price":15,
        "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      },
      {
        "name":"Мясо бессмертных моллюсков Protostomia",
        "price":1337,
        "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      },
      {
        "name":"Плоды Фалленианского дерева",
        "price":874,
        "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      },
      {
        "name":"Хрустящие минеральные кольца",
        "price":300,
        "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
      },
      {
        "name":"Краторная булка N-200i",
        "price":1255,
        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      },
    ]
  }

  return (
    <div className={styles.wrapper + " text text_type_main-default"}>
      <AppHeader />
      <section className={styles.main}>
        <section className={styles.column}>
          <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
          <BurgerIngredients cartProducts={state.cartProducts} />
        </section>
        <section className={styles.column}>
          <BurgerConstructor products={state.cartProducts} />
        </section>
      </section>
    </div>
  );

}
export default App;