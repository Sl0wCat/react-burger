import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';

import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';
import { FC } from 'react';
import { IResetPasswordForm, resetPassword } from '../../services/reducers/resetPassword';
import { getPasswordResetSuccess, getResetMailSend, useAppDispatch, useAppSelector } from '../../services/store';
import useForm from '../../hooks/useForm';

export const ResetPasswordPage: FC = () => {
    const dispatch = useAppDispatch();

    const { values, handleChange } = useForm<IResetPasswordForm>({password: '', token: '' });

    const resetSuccess = useAppSelector(getPasswordResetSuccess);

    //Флаг, что на эту страницу перешли с формы восстановления пароля. Если его нет - перенаправляем пользователя туда, откуда он пришел.
    const resetMailSend = useAppSelector(getResetMailSend);

    let submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword(values));
    }

    if (!resetMailSend)
        return <Navigate to={'/'} />;

    if (resetSuccess) {
        return <Navigate to={'/'} />;
    }

    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={submit}>
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Восстановление пароля</h1>
                    <PasswordInput
                        name={'password'}
                        value={values.password}
                        onChange={handleChange}
                        extraClass="mt-6 mb-6"
                        placeholder='Введите новый пароль'
                    />
                    <Input
                        onPointerEnterCapture={((): void => {})}
                        onPointerLeaveCapture={((): void => {})}
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={values.token}
                        onChange={handleChange}
                        name={'token'}
                        extraClass='mt-6 mb-6'
                    />
                    
                    <Button htmlType="submit" type="primary" size="medium" extraClass='mb-6' >
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