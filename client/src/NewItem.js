import FormModalContainer from './FormModalContainer';
import { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import useFormMessage from './useFormMessage';
import { Button } from 'react-bootstrap';

const initState = { name: '', minStock: '', vendorName: '' };

function NewItem(props) {
  const { getItems } = props;
  const [formData, setFormData] = useState(initState);
  const [show, setShow] = useState(false);
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setFormMessageAndStyle('', 'success');
    setShow(false);
    getItems();
  };

  const handleSubmit = () => {
    // Validation here
    axios
      .post('/api/items', formData)
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
        New Item
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
          <Form.Group className="mb-3" controlId="formItemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemMinStock">
            <Form.Label>Minimum Stock Level</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter minimum stock"
              name="minStock"
              min="0"
              value={formData.minStock}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemVendorName">
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter vendor name"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </FormModalContainer>
    </>
  );
}

export default NewItem;
