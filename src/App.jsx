import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrillCardList from "./components/DrillCardList";
import DashboardLayout from "./components/DashboardLayout";
import GermanPage from "./pages/GermanPage";
import B2Page from "./pages/GermanB2Page"; // Ensure correct import
import EnglishPage from "./pages/EnglishPage";
import C1Page from "./pages/EnglishC1Page"; // Ensure correct import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DrillCardList />} />
          <Route path="german" element={<GermanPage />} />
          <Route path="german/b2" element={<B2Page />} />
          <Route path="english" element={<EnglishPage />} />
          <Route path="english/c1" element={<C1Page />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
