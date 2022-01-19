import FormModalContainer from './FormModalContainer';
// import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Form } from 'react-bootstrap';
import useFormMessage from './useFormMessage';

function DeleteWarehouse(props) {
  const {
    showDeleteModal,
    setShowDeleteModal,
    currentWarehouseData,
    getWarehouses,
  } = props;
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  const handleSubmit = () => {
    axios
      .delete(`/api/warehouses/${currentWarehouseData.id}`)
      .then(() => {
        setFormMessageAndStyle(
          `Deleted ${currentWarehouseData.name}`,
          'danger'
        );
        // setShow(false);
      })
      .catch((error) => {
        setFormMessageAndStyle(
          'There was an error in your submission',
          'danger'
        );
      });
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setFormMessageAndStyle('', 'success');
    getWarehouses();
  };

  return (
    <FormModalContainer
      heading="Delete Item"
      actionButtonVariant="danger"
      actionButtonText="Delete"
      handleSubmit={handleSubmit}
      show={showDeleteModal}
      handleClose={handleClose}
      formMessage={formMessage}
      formMessageStyle={formMessageStyle}
    >
      Really delete Warehouse {currentWarehouseData.id}:{' '}
      {currentWarehouseData.name}?
    </FormModalContainer>
  );
}

export default DeleteWarehouse;
