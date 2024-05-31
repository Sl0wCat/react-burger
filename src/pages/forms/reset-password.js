import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';

import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { resetPassword } from '../../services/reducers/resetPassword';

export function ResetPasswordPage() {
    const dispatch = useDispatch();

    const [form, setValue] = useState({password: '', token: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const resetSuccess = useSelector(state => state.resetPassword.successReset);

    //Флаг, что на эту страницу перешли с формы восстановления пароля. Если его нет - перенаправляем пользователя туда, откуда он пришел.
    const resetMailSend = useSelector(state => state.resetPassword.resetMailSend);

    let submit = useCallback(
        e => {
          e.preventDefault();
          dispatch(resetPassword(form));
          
        },
        [dispatch, form]
    );

    if (!resetMailSend)
        return <Navigate to={'/'} />;

    if (resetSuccess) {
        return <Navigate to={'/'} />;
    }

    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <form className={styles.form}>
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Восстановление пароля</h1>
                    <PasswordInput
                        name={'password'}
                        value={form.password}
                        onChange={onChange}
                        extraClass="mt-6 mb-6"
                        placeholder='Введите новый пароль'
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={form.token}
                        onChange={onChange}
                        name={'token'}
                        extraClass='mt-6 mb-6'
                    />
                    
                    <Button htmlType="button" type="primary" size="medium" onClick={submit} extraClass='mb-6' >
                        Сохранить
                    </Button>
                    <div className="mt-10 text text_type_main-default text_color_inactive">
                    <p className='mt-4 mb-4'>Вспомнили пароль? <Link to="/login">Войти</Link></p>
                </div>
                </form>
                
            </div>
        </>
        
    );
}