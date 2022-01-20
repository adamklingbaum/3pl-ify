import FormModalContainer from './FormModalContainer';
import axios from 'axios';
import useFormMessage from './useFormMessage';

function DeleteStockLevel(props) {
  const {
    showDeleteModal,
    setShowDeleteModal,
    currentStockLevelData,
    getStockLevels,
  } = props;
  const [formMessage, formMessageStyle, setFormMessageAndStyle] =
    useFormMessage();

  const handleSubmit = () => {
    axios
      .delete(
        `/api/stockLevels?itemId=${currentStockLevelData.itemId}&warehouseId=${currentStockLevelData.warehouseId}`,
      )
      .then(() => {
        setFormMessageAndStyle(
          `Deleted Item ${currentStockLevelData.itemId} / Warehouse ${currentStockLevelData.warehouseId} (${currentStockLevelData.warehouse.name})`,
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

  const handleClose = () => {
    setShowDeleteModal(false);
    setFormMessageAndStyle('', 'success');
    getStockLevels();
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
      Really delete Item {currentStockLevelData.itemId} / Warehouse{' '}
      {currentStockLevelData.warehouseId} (
      {currentStockLevelData.warehouse?.name})?
    </FormModalContainer>
  );
}

export default DeleteStockLevel;
