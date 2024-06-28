import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement, useState } from 'react';

import styles from './forms.module.css';

import { update } from '../../services/reducers/user';
import { getUser, useAppDispatch, useAppSelector } from '../../services/store';
import { TUser } from '../../utils/types';
import useForm from '../../hooks/useForm';


export const ProfileForm: FC = (): ReactElement => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUser);

    const [formChanged, setFormChanged] = useState(false);

    const { values, handleChange, setValues } = useForm<TUser>(user ? user : {name: '', email: '', password: ''});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleChange(e);
        setFormChanged(user ? (user.name !== values.name || user.email !== values.email ) : false)
    };

    let submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch(update(values))
    }

    let reset = () => {
        setValues(!!user ? {name: user.name, email: user.email, password: ''} : {name: '', email: '', password: ''});
        setFormChanged(false);
    }

    return (

        <form className={styles.form} onSubmit={submit}>
            <Input
                onPointerEnterCapture={((): void => {})}
                onPointerLeaveCapture={((): void => {})}
                type={'text'}
                placeholder={'Имя'}
                name={'name'}
                value={values.name}
                onChange={onChange}
                extraClass='pt-3 pb-3'
                
            />
            <EmailInput
                name={'email'}
                value={values.email}
                onChange={onChange}
                placeholder="Логин"
                isIcon={true}
                extraClass='pt-3 pb-3'
                
            />
            <PasswordInput
                name={'password'}
                value={values.password ? values.password : ''}
                onChange={onChange}
                extraClass='pt-3 pb-3'
                
            />
            {formChanged && (
                <div className={`${styles.actions} mt-6`} >
                    <Button htmlType="button" type="secondary" size="medium" onClick={reset}>
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            )}
            
        </form>
                
    );
}