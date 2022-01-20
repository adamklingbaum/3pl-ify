import FormModalContainer from './FormModalContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import useFormMessage from './useFormMessage';

function EditStockLevel(props) {
  const {
    showEditModal,
    setShowEditModal,
    currentStockLevelData,
    getStockLevels,
  } = props;
  const [formData, setFormData] = useState({
    currentStockLevelData,
  });
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  useEffect(() => {
    setFormData(currentStockLevelData);
  }, [currentStockLevelData]);

  const handleSubmit = () => {
    axios
      .post(`/api/stockLevels/set`, formData)
      .then(() => {
        setFormMessageAndStyle(
          `Updated Item ${formData.itemId} / Warehouse ${formData.warehouseId}`,
          'success',
        );
      })
      .catch((error) => {
        setFormMessageAndStyle(
          'There was an error in your submission',
          'danger',
        );
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setShowEditModal(false);
    setFormMessageAndStyle('', 'success');
    getStockLevels();
  };

  return (
    <FormModalContainer
      heading="Set Stock Level"
      actionButtonVariant="primary"
      actionButtonText="Save"
      handleSubmit={handleSubmit}
      show={showEditModal}
      handleClose={handleClose}
      formMessage={formMessage}
      formMessageStyle={formMessageStyle}
    >
      <Form>
        <Form.Group className="mb-3" controlId="formItemId">
          <Form.Label>Item ID</Form.Label>
          <Form.Control
            type="number"
            name="itemId"
            value={formData.itemId}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWarehouseId">
          <Form.Label>Warehouse ID</Form.Label>
          <Form.Control
            type="number"
            name="warehouseId"
            value={formData.warehouseId}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUnits">
          <Form.Label>Units</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter vendor name"
            name="units"
            min="0"
            value={formData.units}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </FormModalContainer>
  );
}

export default EditStockLevel;
