import React, { useCallback, FC } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from "react-router-dom";

// Компоненты
import ModalOverlay from "../ModalOverlay/ModalOverlay";

// Стили
import styles from './Modal.module.css';

type TModal = {
    header?: string;
    onClose?: () => void;
    children: React.ReactNode
}

const Modal: FC<TModal> = ({ children, header = null, onClose = null }) => {
    const modalRoot = document.getElementById("modal");
    let navigate = useNavigate();

    const closeModal = useCallback(() => {
        if (onClose)
            onClose();
        else
            navigate(-1);
    }, [navigate, onClose]);
    
    React.useEffect(() => {
        const close = (e: KeyboardEvent): void => {
          if(e.key === 'Escape'){
            closeModal()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[closeModal])

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={closeModal}>
                <div className={styles.modalContent + " pt-10 pr-10 pb-15 pl-10"} onClick={e => e.stopPropagation()} data-testid='modal-window'>
                    <h1 className={styles.modalTitle + " text text_type_main-large"}>
                        {header}
                        <span className={styles.closeButton} data-testid='close-modal-button'>
                            <CloseIcon onClick={closeModal} type="primary" />
                        </span>
                    </h1>
                    {children}
                </div>
            </ModalOverlay>
        ), 
        modalRoot!
    );
}

export default Modal;