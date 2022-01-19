import FormModalContainer from './FormModalContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import useFormMessage from './useFormMessage';

function EditItem(props) {
  const {
    showEditModal,
    setShowEditModal,
    currentWarehouseData,
    getWarehouses,
  } = props;
  const [formData, setFormData] = useState(currentWarehouseData);
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  useEffect(() => {
    setFormData(currentWarehouseData);
  }, [currentWarehouseData]);

  const handleSubmit = () => {
    // Validation here
    axios
      .put(`/api/warehouses/${currentWarehouseData.id}`, formData)
      .then(() => {
        setFormMessageAndStyle(`Updated ${formData.name}`, 'success');
        // setShow(false);
      })
      .catch((error) => {
        setFormMessageAndStyle(
          'There was an error in your submission',
          'danger'
        );
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setShowEditModal(false);
    setFormMessageAndStyle('', 'success');
    getWarehouses();
  };

  return (
    <FormModalContainer
      heading="New Warehouse"
      actionButtonVariant="primary"
      actionButtonText="Save"
      handleSubmit={handleSubmit}
      show={showEditModal}
      handleClose={handleClose}
      formMessage={formMessage}
      formMessageStyle={formMessageStyle}
    >
      <Form>
        <Form.Group className="mb-3" controlId="formItemName">
          <Form.Label>Warehouse Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter warehouse name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formItemAddressLine1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter street address"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formItemAddressLine2">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter unit, suite, etc..."
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formItemCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formItemProvince">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter province"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formItemPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </FormModalContainer>
  );
}

export default EditItem;
