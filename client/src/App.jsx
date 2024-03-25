import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorPage, HistoricData, HomePage } from './Pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historic-data" element={<HistoricData />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
