import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuotationPage from './pages/QuotationPage';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div>
      <DataProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<QuotationPage />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
