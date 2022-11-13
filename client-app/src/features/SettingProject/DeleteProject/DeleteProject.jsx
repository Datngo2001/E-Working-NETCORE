import { Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { useState } from 'react';
import { DELETE_PROJECT_REQUEST } from '../../../store/reducer/project/projectActionTypes';
import { useNavigate } from 'react-router';

function DeleteProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleDeleteConfirm = (confirm) => {
    if (confirm) {
      dispatch({
        type: DELETE_PROJECT_REQUEST,
        payload: currentProject._id
      });
      navigate('/console');
    }
    setShowConfirm(false);
  };

  return (
    <Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Delete Project</h4>
        <Button size="small" variant="contained" color="error" onClick={handleDeleteClick}>
          Delete
        </Button>
      </Box>
      <ConfirmModal
        open={showConfirm}
        message={`Do you want to delete project ${currentProject.name}?`}
        onAnswer={handleDeleteConfirm}
      />
    </Stack>
  );
}

export default DeleteProject;
