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

function StockLevel(props) {
  const {
    stockLevel,
    handleEditClick,
    handleDeleteClick,
    handleStockLevelClick,
  } = props;
  console.log(stockLevel);
  // const [stockLevels, setStockLevels] = useState([]);
  // const totalStockUnits = stockLevels.reduce((total, stockLevel) => {
  //   return total + stockLevel.units;
  // }, 0);

  // const [stockComment, stockCommentStyle] = getStockCommentAndStyle(
  //   totalStockUnits,
  //   item.minStock,
  // );

  // const [stockLoaded, setStockLoaded] = useState(false);

  /*   const getStockLevels = useCallback(() => {
    axios
      .get('/api/stockLevels', { params: { itemId: item.id } })
      .then(({ data }) => {
        setStockLevels(data.stockLevels);
        setStockLoaded(true);
      });
  }, [item.id]);

  useEffect(() => {
    getStockLevels();
  }, [getStockLevels]); */

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
