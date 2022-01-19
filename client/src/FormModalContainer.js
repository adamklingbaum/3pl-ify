import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function FormModalContainer(props) {
  const {
    heading,
    actionButtonVariant,
    actionButtonText,
    handleSubmit,
    children,
    show,
    handleClose,
    formMessage,
    formMessageStyle,
  } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <div className={`mx-auto text-${formMessageStyle}`}>
            {formMessage}
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant={actionButtonVariant} onClick={handleSubmit}>
            {actionButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormModalContainer;
