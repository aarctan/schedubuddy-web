import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "components/Footer";
// import Main from "layouts/Main";
import DeprecationNotice from "layouts/DeprecationNotice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#167742",
    },
    secondary: {
      main: "#FEDB04",
    },
    background: {
      paper: "#EDECEC",
    },
  },
});

const App = () => (
  <div className="page-container">
    <ThemeProvider theme={theme}>
      <div className="content-wrap">
        <DeprecationNotice />
        {/* <Main /> */}
      </div>
      <Footer />
    </ThemeProvider>
  </div>
);

export default App;
