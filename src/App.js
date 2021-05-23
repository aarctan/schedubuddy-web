import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Main from "./layouts/Main";

const theme = createTheme({
  palette: {
    primary: {
      main: "#167742",
    },
    secondary: {
      main: "#FEDB04",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Main />{" "}
    </ThemeProvider>
  );
}

export default App;
