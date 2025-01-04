import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LeagueDetails from "./pages/LeagueDetails";
import TeamDetails from "./pages/TeamDetails";

const App: React.FC = () => {
  return (
    <Router basename="/ui/sports-agenda/">
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/league/:id" element={<LeagueDetails />} />
            <Route path="/team/:id" element={<TeamDetails />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
