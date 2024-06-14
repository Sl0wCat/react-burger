import styles from './ModalOverlay.module.css';
import { FC } from 'react';

type TModalOverlay = {
    onClose: () => void;
    children: React.ReactNode
}

const ModalOverlay: FC<TModalOverlay> = (props) => {
    return (
        <section className={styles.modal} onClick={props.onClose}>
            {props.children}
        </section>
    )
}
export default ModalOverlay;