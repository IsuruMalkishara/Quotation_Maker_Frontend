import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import QuotationPage from './pages/QuotationPage';

function App() {
  return (
    <div>
    <Router>
    <div>
            
            <Routes>
            
            <Route path="/" exact element={<QuotationPage/>}></Route>
            
            </Routes>
    </div>
    </Router>
    </div>
  );
}

export default App;
