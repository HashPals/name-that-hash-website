import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Components/Copyright";
import DarkModeToggle from "react-dark-mode-toggle";
import BuyMeACoffe from "./Components/Coffee";
import Results from "./Components/Results";
import axios from "axios";
const url = "https://9w6lgipuv4.execute-api.eu-west-2.amazonaws.com/Start/api/";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [open, setOpen] = React.useState(false);
  const [myData, setData] = useState(null);
  const [hash, setHash] = useState("");
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    handleOpen();
  };
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? "dark" : "light",
          primary: {
            main: "#2EC4B6",
          },
          secondary: {
            main: "#011627",
          },
        },
      }),
    [isDarkMode]
  );
  const fetchData = async () => {
    try {
      const req = await axios.get(url + btoa(hash));
      setData(req.data);
    } catch (err) {
      console.error(err);
      handleClose();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <DarkModeToggle
        onChange={setIsDarkMode}
        checked={isDarkMode}
        size={80}
        className={classes.Button}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Name That Hash
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="hash"
              label="Hash"
              name="hash"
              placeholder="Your hash!"
              autoFocus
              value={hash}
              onChange={(e) => setHash(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Name it
            </Button>
          </form>
          <Results handleClose={handleClose} open={open} data={myData} />
          <Box className={classes.footer}>
            <Copyright />
            <BuyMeACoffe />
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#FF9F1C",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Button: {
    position: "fixed",
    right: "0",
  },
  footer: {
    position: "fixed",
    bottom: 2,
    height: "40px",
    marginTop: "40px",
    textAlign: "center",
    verticalAlign: "middle",
  },
}));

export default App;
