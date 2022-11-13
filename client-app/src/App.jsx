import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_SESSION_STATUS } from "./store/reducer/user/userActionTypes";
import "./App.css";
import { useEffect } from "react";
import NoLoginLayout from "./layout/NoLoginLayout/NoLoginLayout";
import ConsoleLayout from "./layout/ConsoleLayout/ConsoleLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#039be5",
    },
    secondary: {
      main: "#8777d9",
    },
  },
});

const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: CHECK_SESSION_STATUS,
      payload: {
        onLoggedIn: () => navigate("/console"),
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>{user ? <ConsoleLayout /> : <NoLoginLayout />}</div>
    </ThemeProvider>
  );
};

export default App;
