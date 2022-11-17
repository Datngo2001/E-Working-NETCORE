import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROJECT_REQUEST } from "../../store/reducer/project/projectActionTypes";
import ManageAccess from "./ManageAccess/ManageAccess";
import DeleteProject from "./DeleteProject/DeleteProject";
import SettingForm from "./SettingForm/SettingForm";

function SettingProject() {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);

  const handleSubmit = (data) => {
    dispatch({
      type: UPDATE_PROJECT_REQUEST,
      payload: { id: currentProject.id, data: data },
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <SettingForm project={currentProject} onSubmit={handleSubmit} />
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <ManageAccess />
      </Paper>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <DeleteProject />
      </Paper>
    </Container>
  );
}

export default SettingProject;
