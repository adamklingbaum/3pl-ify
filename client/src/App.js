import './App.css';
import TopNav from './TopNav';
import Items from './Items';
import Warehouses from './Warehouses';
import StockLevels from './StockLevels';

function App() {
  return (
    <div>
      <TopNav />
      <Items />
      <Warehouses />
      <StockLevels />
    </div>
  );
}

export default App;
