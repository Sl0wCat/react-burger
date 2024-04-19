import React, { useEffect, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.js';
import AppHeader from '../Header/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import styles from './App.module.css';

function App() {
  const apiUrl = "https://norma.nomoreparties.space/api/ingredients";
  const cartProductIds = [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0946",
    "643d69a5c3f7b9001cfa0948",
    "643d69a5c3f7b9001cfa093c"
];

  const [data, setData] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  

  useEffect(() => {
    
    const getProductData = async () => {
      try {
        const res = await fetch(apiUrl);
        const apiData = await res.json();
        // data - список продуктов с api
        setData(apiData.data);
        // cartData - список продуктов в корзине
        let cartData = cartProductIds.map((item) => {
          return apiData.data.find((p) => p._id === item)
        });
        setCartProducts(cartData);
      } catch (error) {
        console.log(error);
      }
    }

    getProductData();
  }, []);

  

  return (
    <ErrorBoundary>
      
      <div className={styles.wrapper + " text text_type_main-default"}>
        <AppHeader />
        <main className={styles.main}>
          <section className={styles.column}>
            <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
            <BurgerIngredients ingredients={data} cartProducts={cartProducts} />
          </section>
          <section className={styles.column}>
            {data.length > 0 && (
              <BurgerConstructor products={cartProducts} />
            )}
            
          </section>
        </main>
        
        <div id="react-notifications"></div>
      </div>
    </ErrorBoundary>
    
  );

}
export default App;