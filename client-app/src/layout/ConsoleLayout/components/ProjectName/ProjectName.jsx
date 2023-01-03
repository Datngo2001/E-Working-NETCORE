import { IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./projectName.module.css";
import { useNavigate } from "react-router";

function ProjectName() {
  const navigate = useNavigate();
  const { currentProject } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);
  return (
    <div className={styles["container"]}>
      <Typography
        variant="h5"
        sx={{
          textTransform: "capitalize",
          wordWrap: "normal",
          marginRight: "auto",
        }}
      >
        {currentProject?.name}
      </Typography>
      {currentProject?.creatorId === user.profile.sub ? (
        <IconButton
          onClick={() =>
            navigate(`/console/project/${currentProject?.id}/setting`)
          }
        >
          <SettingsIcon />
        </IconButton>
      ) : null}
    </div>
  );
}

export default ProjectName;
