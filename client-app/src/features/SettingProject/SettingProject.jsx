import { Paper, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingField from "./SettingField/SettingField";
import { UPDATE_PROJECT_REQUEST } from "../../store/reducer/project/projectActionTypes";
import { useCallback } from "react";
import ManageAccess from "./ManageAccess/ManageAccess";
import DeleteProject from "./DeleteProject/DeleteProject";

function SettingProject() {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);

  const handleNameChange = useCallback((name, value) => {
    dispatch({
      type: UPDATE_PROJECT_REQUEST,
      payload: { id: currentProject.id, data: { name: value } },
    });
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Stack spacing={1}>
          <SettingField
            title={"Project Name: "}
            name="name"
            value={currentProject.name}
            onSubmit={handleNameChange}
            edittable
          />
        </Stack>
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
