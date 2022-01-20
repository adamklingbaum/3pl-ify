import { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import Item from './Item';
import NewItem from './NewItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);
  const [currentItemData, setCurrentItemData] = useState({
    name: '',
    minStock: '',
    vendorName: '',
  });
  const [loaded, setLoaded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getItems = () => {
    axios.get('/api/items').then(({ data }) => {
      setItems(data.items);
      setLoaded(true);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleEditClick = (item) => {
    setCurrentItemData(item);
    setShowEditModal(true);
  };

  const handleDeleteClick = (item) => {
    setCurrentItemData(item);
    setShowDeleteModal(true);
  };

  return (
    <Container className="my-5">
      {loaded ? (
        <>
          <h1>Inventory Items</h1>
          <NewItem getItems={getItems} />
          <Table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Vendor Name</th>
                <th>Min Stock</th>
                <th>Units in Stock</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <Item
                  item={item}
                  key={item.id}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </tbody>
          </Table>
          <EditItem
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            currentItemData={currentItemData}
            getItems={getItems}
          />
          <DeleteItem
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            currentItemData={currentItemData}
            getItems={getItems}
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

export default Items;
