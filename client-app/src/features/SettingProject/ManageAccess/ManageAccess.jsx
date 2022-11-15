import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack
} from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  LOAD_PROJECT_MEMBERS_REQUEST,
  UPDATE_PROJECT_REQUEST
} from '../../../store/reducer/project/projectActionTypes';
import { useState } from 'react';
import SearchMember from '../SearchMember/SearchMember';
import { useRef } from 'react';
import ConfirmModal from '../../../components/modal/ConfirmModal';

function ManageAccess() {
  const dispatch = useDispatch();
  const { currentProject, members } = useSelector((state) => state.project);
  const [showSearch, setShowSearch] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteMember = useRef();

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECT_MEMBERS_REQUEST,
      payload: currentProject._id
    });
  }, [currentProject.members]);

  const handleDeleteClick = (member) => {
    deleteMember.current = member;
    setShowConfirm(true);
  };

  const handleDeleteConfirm = (confirm) => {
    if (confirm) {
      var index = currentProject.members.findIndex(
        (member) => member._id == deleteMember.current._id
      );
      currentProject.members.splice(index, 1);

      dispatch({
        type: UPDATE_PROJECT_REQUEST,
        payload: {
          id: currentProject._id,
          data: { members: [...currentProject.members] }
        }
      });
    }

    setShowConfirm(false);
  };

  return (
    <Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Manage Access</h4>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => setShowSearch(true)}>
          Add Member
        </Button>
      </Box>
      <List>
        {members.map((member) => (
          <ListItem
            key={member._id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(member)}>
                <DeleteIcon />
              </IconButton>
            }>
            <ListItemAvatar>
              <Avatar src={member.picture}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={member.email}
              secondary={member._id == currentProject.creator ? 'Creator' : null}
            />
          </ListItem>
        ))}
      </List>
      {showSearch && <SearchMember onClose={() => setShowSearch(false)}></SearchMember>}
      <ConfirmModal
        open={showConfirm}
        message={`Do you want to delete ${deleteMember.current?.email}?`}
        onAnswer={handleDeleteConfirm}
      />
    </Stack>
  );
}

export default ManageAccess;
