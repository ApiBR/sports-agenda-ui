import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LeagueDetails from './pages/LeagueDetails';

function App() {
  return (
    <Router basename="/ui/sports-agenda/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league/:id" element={<LeagueDetails />} />
      </Routes>
    </Router>
  );
}

export default App;