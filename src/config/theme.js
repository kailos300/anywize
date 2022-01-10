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
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
      },
    },
    MuiSelect: {
      root: {
        fontSize: '12px',
      }
    },
    MuiButton: {
      root: {
        borderRadius: '0px',
      },
    },
    MuiFormHelperText: {
      contained: {
        'margin-left': 0,
      },
    },
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
