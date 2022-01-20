import FormModalContainer from './FormModalContainer';
import { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import useFormMessage from './useFormMessage';
import { Button } from 'react-bootstrap';

const initState = { itemId: '', warehouseId: '', units: '' };

function NewStockLevel(props) {
  const { getStockLevels } = props;
  const [formData, setFormData] = useState(initState);
  const [show, setShow] = useState(false);
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setFormMessageAndStyle('', 'success');
    setShow(false);
    getStockLevels();
  };

  const handleSubmit = () => {
    axios
      .post('/api/stockLevels', formData)
      .then(() => {
        setFormMessageAndStyle(
          `Created Item ${formData.itemId} / Warehouse ${formData.warehouseId}`,
          'success',
        );
        setFormData(initState);
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

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        New Stock Level
      </Button>

      <FormModalContainer
        heading="New Item"
        actionButtonVariant="primary"
        actionButtonText="Create"
        handleSubmit={handleSubmit}
        show={show}
        handleClose={handleClose}
        formMessage={formMessage}
        formMessageStyle={formMessageStyle}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formItemId">
            <Form.Label>Item ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter item ID"
              name="itemId"
              min="0"
              value={formData.itemId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formWarehouseId">
            <Form.Label>Warehouse ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter warehouse ID"
              name="warehouseId"
              min="0"
              value={formData.warehouseId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUnits">
            <Form.Label>Units</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of units"
              name="units"
              value={formData.units}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </FormModalContainer>
    </>
  );
}

export default NewStockLevel;
