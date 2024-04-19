import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css';


function Modal({ children, header, onClose })  {
    const modalRoot = document.getElementById("modal");
    
    React.useEffect(() => {
        const close = (e) => {
          if(e.key === 'Escape'){
            onClose()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[onClose])

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={onClose}>
                <div className={styles.modalContent + " pt-10 pr-10 pb-15 pl-10"} onClick={e => e.stopPropagation()}>
                    <h1 className={styles.modalTitle + " text text_type_main-large"}>
                        {header}
                        <span className={styles.closeButton}>
                            <CloseIcon onClick={onClose} type="primary" />
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
    onClose: PropTypes.func.isRequired,
}

export default Modal;