import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoggingDetail from "./pages/insurance/LoggingDetail";
import LoggingList from "./pages/insurance/LoggingList";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoggingList/>} />
            <Route path="/transactions" element={<LoggingDetail />} />
          </Routes>
        </BrowserRouter>

      </div>
  );
}

export default App;

