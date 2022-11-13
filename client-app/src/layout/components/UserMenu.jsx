import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNOUT_REQUEST } from '../../store/reducer/user/userActionTypes';

function UserMenu() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: SIGNOUT_REQUEST,
      payload: {
        success: () => {
          navigate('/');
        }
      }
    });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="avatar" src={user?.photoURL} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem onClick={() => navigate('/profile')}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
