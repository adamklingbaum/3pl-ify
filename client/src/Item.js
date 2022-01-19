import { Button } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function getStockCommentAndStyle(inStock, minStock) {
  if (inStock / minStock >= 1.2) {
    return ['OK', 'success'];
  } else if (inStock / minStock >= 1.1) {
    return ['CLOSE', 'warning'];
  } else {
    return ['LOW', 'danger'];
  }
}

function Item(props) {
  const { item, handleEditClick, handleDeleteClick, handleStockLevelClick } =
    props;
  const [stockLevels, setStockLevels] = useState([]);
  const totalStockUnits = stockLevels.reduce((total, stockLevel) => {
    return total + stockLevel.units;
  }, 0);

  const [stockComment, stockCommentStyle] = getStockCommentAndStyle(
    totalStockUnits,
    item.minStock,
  );

  const [stockLoaded, setStockLoaded] = useState(false);

  const getStockLevels = useCallback(() => {
    axios
      .get('/api/stockLevels', { params: { itemId: item.id } })
      .then(({ data }) => {
        setStockLevels(data.stockLevels);
        setStockLoaded(true);
      });
  }, [item.id]);

  useEffect(() => {
    getStockLevels();
  }, [getStockLevels]);

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.vendorName}</td>
      <td>{item.minStock}</td>
      <td>
        {stockLoaded ? (
          <>
            {totalStockUnits}{' '}
            <strong className={`text-${stockCommentStyle}`}>
              {stockComment}
            </strong>
          </>
        ) : (
          'loading'
        )}
      </td>
      <td>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleEditClick(item)}
        >
          Edit
        </Button>{' '}
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDeleteClick(item)}
        >
          Delete
        </Button>{' '}
      </td>
    </tr>
  );
}

export default Item;
