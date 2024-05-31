import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

function ModalOverlay (props) {
    return (
        <section className={styles.modal} onClick={props.onClose}>
            {props.children}
        </section>
    )
}

ModalOverlay.propTypes ={
    onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;