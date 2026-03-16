import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OverView from './Components/OverView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<OverView />} />
      </Routes>
    </Router>
  );
}

export default App;