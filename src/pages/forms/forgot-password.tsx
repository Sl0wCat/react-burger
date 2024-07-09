import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import React, { FC, useState } from 'react';

// Стили
import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

// Редьюсеры
import { forgotPassword } from '../../services/reducers/resetPassword';
import { getPasswordReset, useAppDispatch, useAppSelector } from '../../services/store';

export const ForgotPasswordPage: FC = () => {

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');

    const resetSuccess = useAppSelector(getPasswordReset);

    let submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPassword({email: email}));
    }

    if (resetSuccess) {
        return <Navigate to={'/reset-password'} />;
    }

    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={submit}>
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Восстановление пароля</h1>
                    
                    <Input
                        onPointerEnterCapture={((): void => {})}
                        onPointerLeaveCapture={((): void => {})}
                        name='email'
                        type='email'
                        value={email}
                        placeholder='Укажите e-mail'
                        extraClass='mt-3 mb-3'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)}
                        autoComplete='email'
                    />
                    
                    <Button htmlType='submit' type='primary' size='medium' extraClass='mb-6'>
                        Восстановить
                    </Button>
                    <div className='mt-10 text text_type_main-default text_color_inactive'>
                        <p className='mt-4 mb-4'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
                    </div>
                </form>
                
            </div>
        </>
        
    );
}