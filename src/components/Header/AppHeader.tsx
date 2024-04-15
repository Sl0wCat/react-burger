import { Logo, BurgerIcon, ListIcon, Button, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';

function AppHeader() {
  return (
      <header className={styles.header + ' pt-4 pb-4'}>
        <nav className={styles.menu}>
            <a href="#" className={styles.link + " pl-5 pr-5 pt-4 pb-4 mr-2"}>
                <BurgerIcon type="primary" /> <span className="pl-2">Конструктор</span>
            </a>
            <a href="#" className={styles.link + " pl-5 pr-5 pt-4 pb-4 mr-2"}>
                <ListIcon  type="primary" /> <span className="pl-2">Лента заказов</span>
            </a>
        </nav>
        <span className={styles.logo}>
            <Logo />
        </span>
        <Button type="secondary" htmlType="button" size="small" extraClass={'ml-2 text text_type_main-default pl-5 pt-4 pb-4 ' + styles.button}>
            <ProfileIcon type="primary" /><span className="pl-2">Личный кабинет</span>
        </Button>
      </header>
  );
}

export default AppHeader;
