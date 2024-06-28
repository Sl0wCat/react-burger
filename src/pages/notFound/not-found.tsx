
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement } from 'react';

import styles from './not-found.module.css';

export const NotFound404: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Страница не найдена</h1>
          <p>Вы перешли по несуществующему адресу.</p>
          <br />
          <br />
          <Button type='primary' onClick={() => navigate('/')} htmlType="button" >Вернуться на главную</Button>
        </div>
      </div>
    </div>
  );
}