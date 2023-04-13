import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HistoricData, HomePage } from './Pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historic-data" element={<HistoricData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
