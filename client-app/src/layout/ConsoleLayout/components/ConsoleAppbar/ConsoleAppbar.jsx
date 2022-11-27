import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, Breadcrumbs } from "@mui/material";
import MenuButton from "../../../components/MenuButton";
import UserMenu from "../../../components/UserMenu";
import Logo from "../../../components/Logo";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./consoleAppbar.module.css";
import ProjectNavigate from "../ProjectNavigate";
import { Link, useLocation } from "react-router-dom";

function ConsoleAppbar() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  const pages = [
    {
      title: "Home",
      link: "/",
    },
  ];

  const isViewProjectSelect = () => {
    if (pathname.includes("project/")) {
      return true;
    }
    return false;
  };

  return (
    <AppBar position="static" sx={{ boxShadow: "none" }}>
      <div className={styles["container"]}>
        <Toolbar disableGutters>
          <MenuButton pages={pages}></MenuButton>

          <Logo navlink={"/console"}></Logo>

          <Box sx={{ marginLeft: 3 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
              <Link
                to={"/console"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Console
              </Link>
              {isViewProjectSelect() && <ProjectNavigate />}
            </Breadcrumbs>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          {user ? <UserMenu /> : <CircularProgress color="inherit" />}
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default ConsoleAppbar;
