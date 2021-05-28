import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Main from "./layouts/Main";
import Footer from "./components/Footer";

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
    <div className="page-container">
      <div className="content-wrap">
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </div>
      <Footer description="Description" title="Title" />
    </div>
  );
}

export default App;
