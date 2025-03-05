import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import DrillCardList from "./components/DrillCardList";
import DashboardLayout from "./components/DashboardLayout";
import GermanPage from "./pages/GermanPage";
import B2Page from "./pages/GermanB2Page"; // Ensure correct import
import EnglishPage from "./pages/EnglishPage";
import C1Page from "./pages/EnglishC1Page"; // Ensure correct import
import { CardsProvider } from "./context/CardsContext";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "system"
  );

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    localStorage.setItem("themeMode", mode);
  };

  const getTheme = () => {
    if (themeMode === "system") {
      return prefersDarkMode ? darkTheme : lightTheme;
    }
    return themeMode === "dark" ? darkTheme : lightTheme;
  };

  const darkMode =
    themeMode === "system" ? prefersDarkMode : themeMode === "dark";

  return (
    <ThemeProvider theme={getTheme()}>
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
                  themeMode={themeMode}
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
