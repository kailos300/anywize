import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: '12px',
      },
    },
    MuiFilledInput: {
      root: {
        fontSize: '12px',
      },
    },
    MuiSelect: {
      root: {
        fontSize: '12px',
      }
    }
  },
  palette: {
    primary: {
      main: "#6F9CEB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1D283E",
      contrastText: "#FFFFFF",
    },
  },
});

export default theme;
