import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';

import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

import { login } from '../../services/reducers/user';
import { useDispatch } from 'react-redux';

export function LoginPage() {
    const dispatch = useDispatch();

    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let submit = useCallback(
        e => {
          e.preventDefault();
          dispatch(login(form))
        },
        [dispatch, form]
    );
    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={submit}>
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Вход</h1>
                    <Input
                        name={'email'}
                        type='email'
                        value={form.email}
                        onChange={onChange}
                        placeholder="Логин"
                        extraClass="pt-3 pb-3"
                    />
                    <PasswordInput
                        name={'password'}
                        value={form.password}
                        onChange={onChange}
                        extraClass="pt-3 pb-3"
                    />

                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-6'>
                    Войти
                    </Button>
                    <div className="mt-10 text text_type_main-default text_color_inactive">
                        <p className='mt-4 mb-4'>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
                        <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
                    </div>
                </form>
                
            </div>
        </>
        
    );
}