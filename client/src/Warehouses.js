import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import Warehouse from './Warehouse';
import NewWarehouse from './NewWarehouse';
import EditWarehouse from './EditWarehouse';
import DeleteWarehouse from './DeleteWarehouse';

function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [currentWarehouseData, setCurrentWarehouseData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
  });
  const [loaded, setLoaded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getWarehouses = () => {
    axios.get('/api/warehouses').then(({ data }) => {
      setWarehouses(data.warehouses);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  const handleEditClick = (warehouse) => {
    setCurrentWarehouseData(warehouse);
    setShowEditModal(true);
  };

  const handleDeleteClick = (warehouse) => {
    setCurrentWarehouseData(warehouse);
    setShowDeleteModal(true);
  };

  return (
    <Container className="my-5">
      {loaded ? (
        <>
          <h1>Warehouses</h1>
          <NewWarehouse getWarehouses={getWarehouses} />
          <Table>
            <thead>
              <tr>
                <th>Warehouse ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Province</th>
                <th>Postal Code</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <Warehouse
                  warehouse={warehouse}
                  key={warehouse.id}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </tbody>
          </Table>
          <EditWarehouse
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            currentWarehouseData={currentWarehouseData}
            getWarehouses={getWarehouses}
          />
          <DeleteWarehouse
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            currentWarehouseData={currentWarehouseData}
            getWarehouses={getWarehouses}
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

export default Warehouses;
