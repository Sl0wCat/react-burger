import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';

import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

import { register } from '../../services/reducers/user';

export function RegisterPage() {
    const dispatch = useDispatch();

    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let submit = useCallback(
        e => {
          e.preventDefault();
          dispatch(register(form))
        },
        [dispatch, form]
    );

    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={submit}>
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Регистрация</h1>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        value={form.name}
                        onChange={onChange}
                        extraClass='mt-6 mb-6'
                    />
                    <Input 
                        name={'email'}
                        type='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={onChange}
                        extraClass='mt-6 mb-6'
                    />
                    <PasswordInput
                        name={'password'}
                        extraClass="mt-6 mb-6"
                        value={form.password}
                        onChange={onChange}
                    />

                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-6' >
                        Зарегистрироваться
                    </Button>
                    <div className="mt-10 text text_type_main-default text_color_inactive">
                        <p className='mt-4 mb-4'>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
                    </div>
                </form>
                
            </div>
        </>
        
    );
}