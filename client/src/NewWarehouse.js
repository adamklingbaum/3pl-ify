import FormModalContainer from './FormModalContainer';
import { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import useFormMessage from './useFormMessage';
import { Button } from 'react-bootstrap';

const initState = {
  name: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  postalCode: '',
};

function NewWarehouse(props) {
  const { getWarehouses } = props;
  const [formData, setFormData] = useState(initState);
  const [show, setShow] = useState(false);
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setFormMessageAndStyle('', 'success');
    setShow(false);
    getWarehouses();
  };

  const handleSubmit = () => {
    // Validation here
    axios
      .post('/api/warehouses', formData)
      .then(() => {
        setFormMessageAndStyle(`Created ${formData.name}`, 'success');
        setFormData(initState);
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

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        New Warehouse
      </Button>

      <FormModalContainer
        heading="New Warehouse"
        actionButtonVariant="primary"
        actionButtonText="Create"
        handleSubmit={handleSubmit}
        show={show}
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
    </>
  );
}

export default NewWarehouse;
