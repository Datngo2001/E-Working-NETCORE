import React from "react";
import { useSelector } from "react-redux";
import NavButton from "../NavButton/NavButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import styles from "./sideBar.module.css";
import ProjectName from "../ProjectName/ProjectName";

function SideBar() {
  const { currentProject } = useSelector((state) => state.project);

  return (
    <div className={styles["container"]}>
      <ProjectName />
      <NavButton to={`/console/project/${currentProject?.id}/stage`}>
        <DashboardIcon fontSize="inherit" />
        RoadMap
      </NavButton>
      <NavButton to={`/console/project/${currentProject?.id}/board`}>
        <AlignHorizontalLeftIcon fontSize="inherit" />
        Board
      </NavButton>
    </div>
  );
}

export default SideBar;
