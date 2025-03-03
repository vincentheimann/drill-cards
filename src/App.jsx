import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashCardList from "./components/FlashCardList";
import DashboardLayout from "./components/DashboardLayout";
import GermanPage from "./pages/GermanPage";
import B2Page from "./pages/GermanB2Page"; // Ensure correct import
import Home from "./pages/Home"; // Import Home page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<FlashCardList />} />
          <Route path="german" element={<GermanPage />} />
          <Route path="german/b2" element={<B2Page />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
