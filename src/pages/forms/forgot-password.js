import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

import { forgotPassword } from '../../services/reducers/resetPassword';

export function ForgotPasswordPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const resetSuccess = useSelector(state => state.resetPassword.success);
    

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
                <form className={styles.form} >
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Восстановление пароля</h1>
                    <EmailInput
                        name={'email'}
                        value={email}
                        placeholder='Укажите e-mail'
                        isIcon={true}
                        extraClass='mt-3 mb-3'
                        onChange={onChange}
                    />
                    
                    <Button htmlType='button' type='primary' size='medium' onClick={submit} extraClass='mb-6'>
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