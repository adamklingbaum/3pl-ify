import { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import StockLevel from './StockLevel';
import NewStockLevel from './NewStockLevel';
import EditStockLevel from './EditStockLevel';
import DeleteStockLevel from './DeleteStockLevel';
import axios from 'axios';

function StockLevels() {
  const [stockLevels, setStockLevels] = useState([]);
  const [currentStockLevelData, setCurrentStockLevelData] = useState({
    itemId: '',
    warehouseId: '',
    units: '',
  });

  const [loaded, setLoaded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getStockLevels = () => {
    axios.get('/api/items').then(({ data }) => {
      let newStockLevels = [];
      Promise.all(
        data.items.map((item) =>
          axios.get(`/api/stockLevels?itemId=${item.id}`),
        ),
      ).then((results) => {
        results.forEach(({ data }) => {
          newStockLevels = [...newStockLevels, ...data.stockLevels];
        });
        setStockLevels(newStockLevels);
        setLoaded(true);
      });
    });
  };

  useEffect(() => {
    getStockLevels();
  }, []);

  const handleEditClick = (stockLevel) => {
    setCurrentStockLevelData(stockLevel);
    setShowEditModal(true);
  };

  const handleDeleteClick = (stockLevel) => {
    setCurrentStockLevelData(stockLevel);
    setShowDeleteModal(true);
  };

  return (
    <Container className="my-5">
      {loaded ? (
        <>
          <h1>Stock Levels</h1>
          <NewStockLevel getStockLevels={getStockLevels} />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item ID</th>
                <th>Warehouse ID</th>
                <th>Warehouse Name</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {stockLevels.map((stockLevel) => (
                <StockLevel
                  stockLevel={stockLevel}
                  key={stockLevel.id}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </tbody>
          </Table>
          <EditStockLevel
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            currentStockLevelData={currentStockLevelData}
            setCurrentStockLevelData={getStockLevels}
            getStockLevels={getStockLevels}
          />
          <DeleteStockLevel
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            currentStockLevelData={currentStockLevelData}
            getStockLevels={getStockLevels}
          />
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
}

export default StockLevels;
