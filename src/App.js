import { Route, Routes} from 'react-router-dom';
import Checkout from './views/checkout';
import Confirmation from './views/confirmation'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Checkout />} />
      <Route path='/confirmation' element={<Confirmation />}/>
    </Routes>
  );
}

export default App;
