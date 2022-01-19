import { Button } from 'react-bootstrap';

function Warehouse(props) {
  const { warehouse, handleEditClick, handleDeleteClick } = props;

  return (
    <tr>
      <td>{warehouse.id}</td>
      <td>{warehouse.name}</td>
      <td>
        <div>{warehouse.addressLine1}</div>
        <div>{warehouse.addressLine2}</div>
      </td>
      <td>{warehouse.city}</td>
      <td>{warehouse.province}</td>
      <td>{warehouse.postalCode}</td>
      <td>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleEditClick(warehouse)}
        >
          Edit
        </Button>{' '}
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDeleteClick(warehouse)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Warehouse;
