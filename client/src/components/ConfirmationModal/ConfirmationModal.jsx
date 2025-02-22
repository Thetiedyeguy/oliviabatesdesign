import React from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <button 
            onClick={onConfirm}
            className={styles.confirmButton}
          >
            Yes, Delete
          </button>
          <button 
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;