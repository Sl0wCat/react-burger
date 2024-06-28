import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FC, useState } from 'react';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

// Стили
import styles from './styles.module.css';

export const ProfilePage: FC = () => {
    const {pathname} = useLocation();

    const [profileText, setProfileText] = useState('В этом разделе вы можете изменить свои персональные данные');

    return (
        <>
            <AppHeader />
            <div className={`${styles.wrapper} text text_type_main-default`}>
          
                <main className={styles.main}>
                    <section className={`${styles.column} ${styles.menu} text text_type_main-medium`}>
                        <NavLink 
                            to="/profile" 
                            className={() => pathname==='/profile' ? `${styles.active} ${styles.link}` : styles.link}
                            onClick={() => setProfileText('В этом разделе вы можете изменить свои персональные данные')}
                        >
                            Профиль
                        </NavLink>
                        <NavLink 
                            to="/profile/orders"
                            className={({isActive}) => isActive ? `${styles.active} ${styles.link}` : styles.link}
                            onClick={() => setProfileText('В этом разделе вы можете просмотреть свою историю заказов')}
                        >
                            История заказов
                        </NavLink>
                        <NavLink 
                            to="/logout" 
                            className={({isActive}) => isActive ? `${styles.active} ${styles.link}` : styles.link}
                        >
                            Выход
                        </NavLink>
                        <p className='pt-10 text text_type_main-default text_color_inactive'>{profileText}</p>
                    </section>
                    <section className={`${styles.column} ${styles.content}`}>
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
        
    )
}