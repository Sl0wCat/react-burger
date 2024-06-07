import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';

import styles from './forms.module.css';

import { update } from '../../services/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/store';

export function ProfileForm() {
    const dispatch = useDispatch();

    const user = useSelector(getUser);

    const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
    const [formChanged, setFormChanged] = useState(false);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setFormChanged(user[e.target.name] !== e.target.value )
    };

    let submit = useCallback(
        e => {
          e.preventDefault();
          dispatch(update(form))
        },
        [dispatch, form]
    );

    let reset = useCallback(
        e => {
          setValue({name: user.name, email: user.email, password: ''});
          setFormChanged(false);
        },
        [user]
    );

    return (

        <form className={styles.form} onSubmit={submit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                name={'name'}
                value={form.name}
                onChange={onChange}
                extraClass='pt-3 pb-3'
            />
            <EmailInput
                name={'email'}
                value={form.email}
                onChange={onChange}
                placeholder="Логин"
                isIcon={true}
                extraClass='pt-3 pb-3'
            />
            <PasswordInput
                name={'password'}
                value={form.password}
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