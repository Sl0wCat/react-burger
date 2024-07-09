import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { FC } from 'react';

// Стили
import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

// Редьюсеры
import { ILoginForm, login } from '../../services/reducers/user';
import { getLoginError, useAppDispatch, useAppSelector } from '../../services/store';
import useForm from '../../hooks/useForm';

export const LoginPage: FC = () => {
    const dispatch = useAppDispatch();

    const error = useAppSelector(getLoginError);
    

    const { values, handleChange } = useForm<ILoginForm>({email: '', password: ''});

    let submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(values))
    }

    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={submit}>
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Вход</h1>
                    <Input
                        onPointerEnterCapture={((): void => {})}
                        onPointerLeaveCapture={((): void => {})}
                        name={'email'}
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Логин"
                        extraClass="pt-3 pb-3"
                        autoComplete='email'
                    />
                    <PasswordInput
                        name={'password'}
                        value={values.password}
                        onChange={handleChange}
                        extraClass="pt-3 pb-3"
                        autoComplete='current-password'
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