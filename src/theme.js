import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#43A047",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FB8C00",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FF9800",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#4CAF50",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#424242", // Main text color (darker for contrast)
      secondary: "#757575", // Subtitles and hints
    },
    divider: "#BDBDBD", // Light gray dividers
    card: {
      background: "#FFFFFF",
      title: "#212121",
      subtitle: "#616161",
    },
  },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h1: { color: "#212121" },
//     h2: { color: "#212121" },
//     h3: { color: "#424242" },
//     h4: { color: "#424242" },
//     h5: { color: "#616161" },
//     h6: { color: "#757575" },
//     subtitle1: { color: "#616161" },
//     subtitle2: { color: "#757575" },
    body1: { color: "#424242" },
//     body2: { color: "#616161" },
//     caption: { color: "#9E9E9E" },
//     overline: { color: "#9E9E9E" },
//   },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64B5F6",
      contrastText: "#121212",
    },
    secondary: {
      main: "#81C784",
      contrastText: "#121212",
    },
    error: {
      main: "#FFB74D",
      contrastText: "#121212",
    },
    warning: {
      main: "#FFA726",
      contrastText: "#121212",
    },
    success: {
      main: "#66BB6A",
      contrastText: "#121212",
    },
    info: {
      main: "#29B6F6",
      contrastText: "#121212",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E0E0E0", // High contrast for text
      secondary: "#B0BEC5", // Softer contrast
    },
    divider: "#2C2C2C",
    action: {
      hover: "#292929",
    },
    card: {
      background: "#1E1E1E",
      title: "#FFFFFF",
      subtitle: "#B0BEC5",
    },
  },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h1: { color: "#FFFFFF" },
//     h2: { color: "#FFFFFF" },
//     h3: { color: "#E0E0E0" },
//     h4: { color: "#E0E0E0" },
//     h5: { color: "#B0BEC5" },
//     h6: { color: "#B0BEC5" },
//     subtitle1: { color: "#B0BEC5" },
//     subtitle2: { color: "#B0BEC5" },
    body1: { color: "#E0E0E0" },
//     body2: { color: "#B0BEC5" },
//     caption: { color: "#9E9E9E" },
//     overline: { color: "#9E9E9E" },
//   },
});

export { lightTheme, darkTheme };
