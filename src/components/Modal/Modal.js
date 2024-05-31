import React, { useCallback } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css';
import { useNavigate } from "react-router-dom";

function Modal({ children, header })  {
    const modalRoot = document.getElementById("modal");
    let navigate = useNavigate();

    const closeModal = useCallback(() => {
        navigate(-1);
    }, [navigate]);
    
    React.useEffect(() => {
        const close = (e) => {
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
                <div className={styles.modalContent + " pt-10 pr-10 pb-15 pl-10"} onClick={e => e.stopPropagation()}>
                    <h1 className={styles.modalTitle + " text text_type_main-large"}>
                        {header}
                        <span className={styles.closeButton}>
                            <CloseIcon onClick={closeModal} type="primary" />
                        </span>
                    </h1>
                    {children}
                </div>
            </ModalOverlay>
        ), 
        modalRoot
    );
  
}

Modal.propTypes ={
    header: PropTypes.string,
}

export default Modal;