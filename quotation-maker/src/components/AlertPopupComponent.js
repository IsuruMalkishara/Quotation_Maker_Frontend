import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

const AlertPopupComponent = ({ message, onClose }) => {
  return (
    <div>
      <Modal show={true} onHide={onClose} style={{ maxWidth: '350px', margin: 'auto' }}>
        <Modal.Body>
          <div className="row">
            <div className='col-9' style={{ marginTop: '5px' }}>
              <p>{message}</p>
            </div>
            <div className='col-3'>
              <IconButton onClick={onClose}>
                <CancelIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AlertPopupComponent;
