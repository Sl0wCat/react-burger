import { Link, NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, ReactElement } from 'react';

import styles from './AppHeader.module.css';

const AppHeader: FC = (): ReactElement => {
  return (
      <header className={styles.header}>
        <section className={`${styles.content} pt-4 pb-4`}>
            <nav className={styles.menu}>
                <NavLink to='/' className={({isActive}) => isActive ? `${styles.active} ${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2` : `${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}>
                    {({isActive}) => (
                            isActive ? <><BurgerIcon type='primary' /> <span className={`pl-2 ${styles.active}`} >Конструктор</span></>
                            : <><BurgerIcon type='secondary' /> <span className='pl-2' >Конструктор</span></>
                    )}
                </NavLink>
                <NavLink to='/feed' className={({isActive}) => isActive ? `${styles.active} ${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2` : `${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}>
                    {({isActive}) => (
                            isActive ? <><ListIcon  type='primary' /> <span className={`pl-2 ${styles.active}`}>Лента заказов</span></>
                            : <><ListIcon  type='secondary' /> <span className='pl-2'>Лента заказов</span></>
                    )}
                </NavLink>

            </nav>
            <span className={styles.logo}>
                <Link to='/'><Logo /></Link>
            </span>
            <NavLink to='/profile' className={({isActive}) => isActive ? `${styles.active} ${styles.link}` : styles.link}>
                {({isActive}) => (
                        isActive ? <><ProfileIcon type='primary' /><span className='pl-2'>Личный кабинет</span></>
                        : <><ProfileIcon type='secondary' /><span className='pl-2'>Личный кабинет</span></>
                )}
            </NavLink>
        </section>
        
      </header>
  );
}

export default AppHeader;
