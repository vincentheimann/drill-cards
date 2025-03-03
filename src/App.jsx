import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardList from "./components/FlashCardList";
import DashboardLayout from "./components/DashboardLayout";
import GermanPage from "./pages/GermanPage";
import B2Page from "./pages/GermanB2Page"; // Ensure correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<FlashcardList />} />
          <Route path="german" element={<GermanPage />} />
          <Route path="german/b2" element={<B2Page />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
