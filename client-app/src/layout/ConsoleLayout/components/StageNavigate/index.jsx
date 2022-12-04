import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import SelectStage from "./SelectStage";

function StageNavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { stages } = useSelector((state) => state.stage);
  const handleSelectStage = (stage) => {
    let newPath = pathname.split("/");
    let index = newPath.findIndex((x) => x === "stage");
    if (index > 0) {
      newPath[index + 1] = stage.id;
    } else {
      newPath.push("stage");
      newPath.push(stage.id);
    }
    navigate(newPath.join("/"));
  };
  return (
    <Box>
      <SelectStage stages={stages} onSelectChange={handleSelectStage} />
    </Box>
  );
}

export default StageNavigate;
