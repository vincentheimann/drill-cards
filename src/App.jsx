import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import DrillCardList from "./components/DrillCardList";
import DashboardLayout from "./components/DashboardLayout";
import GermanPage from "./pages/GermanPage";
import B2Page from "./pages/GermanB2Page"; // Ensure correct import
import EnglishPage from "./pages/EnglishPage";
import C1Page from "./pages/EnglishC1Page"; // Ensure correct import
import { CardsProvider } from "./context/CardsContext";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <CardsProvider>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardLayout
                  handleThemeChange={handleThemeChange}
                  darkMode={darkMode}
                />
              }
            >
              <Route index element={<DrillCardList />} />
              <Route path="german" element={<GermanPage />} />
              <Route path="german/b2" element={<B2Page />} />
              <Route path="english" element={<EnglishPage />} />
              <Route path="english/c1" element={<C1Page />} />
            </Route>
          </Routes>
        </CardsProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
