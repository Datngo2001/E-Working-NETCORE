import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField
} from '@mui/material';
import React from 'react';
import BasicModal from '../../../components/modal/BasicModal/BasicModal';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRef } from 'react';
import { searchUsersByEmail } from '../../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { UPDATE_PROJECT_REQUEST } from '../../../store/reducer/project/projectActionTypes';

function SearchMember({ onClose }) {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);

  const [showConfirm, setShowConfirm] = useState(false);
  const [term, setTerm] = useState('');
  const [users, setUsers] = useState([]);
  const throttle = useRef();
  const selectedUser = useRef();

  const handleSearch = (e) => {
    setTerm(e.target.value);

    if (throttle.current) {
      clearTimeout(throttle.current);
    }

    throttle.current = setTimeout(async () => {
      const res = await searchUsersByEmail(e.target.value);
      setUsers(res.data);
    }, 500);
  };

  const handleMemberClick = (user) => {
    selectedUser.current = user;
    setShowConfirm(true);
  };

  const handleAddConfirm = (confirm) => {
    if (confirm) {
      dispatch({
        type: UPDATE_PROJECT_REQUEST,
        payload: {
          id: currentProject._id,
          data: { members: [...currentProject.members, selectedUser.current._id] }
        }
      });
    }

    setShowConfirm(false);
    onClose();
  };

  return (
    <BasicModal onClose={onClose}>
      <Box
        sx={{
          width: 500,
          height: 700,
          padding: 2
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 1
          }}>
          <h2 style={{ margin: 0 }}>Add Members</h2>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          type="text"
          placeholder="Search"
          sx={{ width: '100%' }}
          value={term}
          onChange={handleSearch}
        />

        <List>
          {users.map((user) => (
            <ListItemButton key={user._id} onClick={() => handleMemberClick(user)}>
              <ListItemAvatar>
                <Avatar src={user.picture}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.email} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <ConfirmModal
        open={showConfirm}
        message={`Do you want to add ${selectedUser.current?.email}?`}
        onAnswer={handleAddConfirm}
      />
    </BasicModal>
  );
}

export default SearchMember;
