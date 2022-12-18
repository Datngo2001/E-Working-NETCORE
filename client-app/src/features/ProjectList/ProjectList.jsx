import { Box, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AppSkeleton from "../../components/AppSkeleton";
import {
  JOINED_PROJECT_REQUEST,
  MY_PROJECT_REQUEST,
  SET_CURRENT_PROJECT,
} from "../../store/reducer/project/projectActionTypes";
import CreateProjectModal from "../CreateProject/CreateProjectModal";
import CreateProjectButton from "./components/CreateProjectButton/CreateProjectButton";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import styles from "./projectList.module.css";

const MINE = 0;
const JOINED = 1;

function ProjectList() {
  const { projectList } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [isShowModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (tab === MINE) {
      dispatch({
        type: MY_PROJECT_REQUEST,
      });
    } else if (tab === JOINED) {
      dispatch({
        type: JOINED_PROJECT_REQUEST,
      });
    }
  }, [tab]);

  const handleCardClick = (id) => {
    navigate(`/console/project/${id}/stage`);
  };

  return (
    <div className={styles["container"]}>
      <h2>Projects List</h2>

      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 3 }}>
        <Tabs
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
          }}
          aria-label="basic tabs example"
        >
          <Tab label="Mine" />
          <Tab label="Joined" />
        </Tabs>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
        {tab === MINE && (
          <Grid item xs={12} md={6} lg={4} onClick={openModal}>
            <CreateProjectButton />
          </Grid>
        )}
        {projectList.map((project, index) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={index}
            onClick={() => handleCardClick(project.id)}
          >
            <ProjectCard name={project.name} />
          </Grid>
        ))}
      </Grid>
      <CreateProjectModal isOpen={isShowModal} closeModal={closeModal} />
    </div>
  );
}

export default ProjectList;
