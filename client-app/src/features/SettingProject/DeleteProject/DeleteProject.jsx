import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PROJECT_REQUEST } from "../../../store/reducer/project/projectActionTypes";
import { useNavigate } from "react-router";
import useConfirmModal from "../../../hooks/useConfirmModal";

function DeleteProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const openConfirm = useConfirmModal();

  const handleDeleteClick = () => {
    openConfirm({
      message: "Save Changes?",
      onYes: () => {
        dispatch({
          type: DELETE_PROJECT_REQUEST,
          payload: currentProject.id,
        });
        navigate("/console");
      },
      onNo: () => {},
    });
  };

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Delete Project</h4>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Box>
    </Stack>
  );
}

export default DeleteProject;
