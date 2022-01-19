import FormModalContainer from './FormModalContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import useFormMessage from './useFormMessage';

function EditItem(props) {
  const { showEditModal, setShowEditModal, currentItemData, getItems } = props;
  const [formData, setFormData] = useState(currentItemData);
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  // console.log({ currentItemData });
  // console.log(formData);
  useEffect(() => {
    setFormData(currentItemData);
  }, [currentItemData]);

  const handleSubmit = () => {
    // Validation here
    axios
      .put(`/api/items/${currentItemData.id}`, formData)
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
    getItems();
  };

  return (
    <FormModalContainer
      heading="Edit Item"
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
  );
}

export default EditItem;
