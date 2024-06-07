import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

import { forgotPassword } from '../../services/reducers/resetPassword';
import { getPasswordReset } from '../../services/store';

export function ForgotPasswordPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const resetSuccess = useSelector(getPasswordReset);
    

    const onChange = e => {
        setEmail(e.target.value );
    };

    let submit = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPassword({email: email}));
            
        },
        [dispatch, email]
    );
    
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
                        name={'email'}
                        type='email'
                        value={email}
                        placeholder='Укажите e-mail'
                        extraClass='mt-3 mb-3'
                        onChange={onChange}
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