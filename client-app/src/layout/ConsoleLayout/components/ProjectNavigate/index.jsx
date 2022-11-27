import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import SelectProject from "./SelectProject";

function ProjectNavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { projectList } = useSelector((state) => state.project);
  const handleSelectProject = (project) => {
    let newPath = pathname.split("/");
    newPath[3] = project.id;
    navigate(newPath.join("/"));
  };
  return (
    <Box>
      <SelectProject
        projects={projectList}
        onSelectChange={handleSelectProject}
      />
    </Box>
  );
}

export default ProjectNavigate;
