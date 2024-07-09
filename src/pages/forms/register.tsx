import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { FC } from 'react';

import styles from './forms.module.css';

// Компоненты
import AppHeader from '../../components/Header/AppHeader';

import { register } from '../../services/reducers/user';
import { useAppDispatch } from '../../services/store';
import useForm from '../../hooks/useForm';

type TRegisterForm = {
    name: string;
    email: string;
    password: string;
}

export const RegisterPage: FC = () => {
    const dispatch = useAppDispatch();

    const { values, handleChange } = useForm<TRegisterForm>({name: '', email: '', password: ''});

    let submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(values))
    }

    return (
        <>
            <AppHeader />
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={submit}>
                    <h1 className={styles.heading + ' text text_type_main-medium'}>Регистрация</h1>
                    <Input
                        onPointerEnterCapture={((): void => {})}
                        onPointerLeaveCapture={((): void => {})}
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        value={values.name}
                        onChange={handleChange}
                        extraClass='mt-6 mb-6'
                    />
                    <Input
                        onPointerEnterCapture={((): void => {})}
                        onPointerLeaveCapture={((): void => {})}
                        name={'email'}
                        type='email'
                        placeholder='Email'
                        value={values.email}
                        onChange={handleChange}
                        extraClass='mt-6 mb-6'
                    />
                    <PasswordInput
                        name={'password'}
                        extraClass="mt-6 mb-6"
                        value={values.password}
                        onChange={handleChange}
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