import logo from './logo.svg';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Checkout from './views/checkout';
function App() {
  return (
    <Routes>
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
