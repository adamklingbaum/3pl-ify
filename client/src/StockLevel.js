import { Button } from 'react-bootstrap';

function StockLevel(props) {
  const { stockLevel, handleEditClick, handleDeleteClick } = props;

  return (
    <tr>
      <td>{stockLevel.id}</td>
      <td>{stockLevel.itemId}</td>
      <td>{stockLevel.warehouseId}</td>
      <td>{stockLevel.warehouse.name}</td>
      <td>{stockLevel.units}</td>
      <td>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleEditClick(stockLevel)}
        >
          Set
        </Button>{' '}
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDeleteClick(stockLevel)}
        >
          Delete
        </Button>{' '}
      </td>
    </tr>
  );
}

export default StockLevel;
