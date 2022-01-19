import FormModalContainer from './FormModalContainer';
import axios from 'axios';
import useFormMessage from './useFormMessage';

function DeleteItem(props) {
  const { showDeleteModal, setShowDeleteModal, currentItemData, getItems } =
    props;
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  const handleSubmit = () => {
    axios
      .delete(`/api/items/${currentItemData.id}`)
      .then(() => {
        setFormMessageAndStyle(`Deleted ${currentItemData.name}`, 'success');
        // setShow(false);
      })
      .catch((error) => {
        setFormMessageAndStyle(
          'There was an error in your submission',
          'danger',
        );
      });
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setFormMessageAndStyle('', 'success');
    getItems();
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
      Really delete Item {currentItemData.id}: {currentItemData.name}?
    </FormModalContainer>
  );
}

export default DeleteItem;
