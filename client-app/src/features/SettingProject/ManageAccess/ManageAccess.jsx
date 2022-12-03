import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  LOAD_PROJECT_MEMBERS_REQUEST,
  UPDATE_MEMBERS_REQUEST,
} from "../../../store/reducer/project/projectActionTypes";
import { useState } from "react";
import SearchMember from "../SearchMember/SearchMember";
import { useRef } from "react";
import UserAvatar from "../../../components/UserAvatar";
import useConfirmModal from "../../../hooks/useConfirmModal";

function ManageAccess() {
  const dispatch = useDispatch();
  const { currentProject, members } = useSelector((state) => state.project);
  const [showSearch, setShowSearch] = useState(false);
  const openConfirm = useConfirmModal();

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECT_MEMBERS_REQUEST,
      payload: currentProject.id,
    });
  }, [currentProject.members]);

  const handleDeleteClick = (member) => {
    openConfirm({
      message: `Do you want to delete ${member.email}?`,
      onYes: () => {
        var index = currentProject.members.findIndex((m) => m.id === member.id);
        currentProject.members.splice(index, 1);
        var ids = currentProject.members.map((m) => m.id);

        dispatch({
          type: UPDATE_MEMBERS_REQUEST,
          payload: {
            id: currentProject.id,
            data: { memberIds: [...ids] },
          },
        });
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
        <h4>Manage Access</h4>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => setShowSearch(true)}
        >
          Add Member
        </Button>
      </Box>
      <List>
        {members.map((member) => (
          <ListItem
            key={member.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(member)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <UserAvatar name={member.userName} />
            </ListItemAvatar>
            <ListItemText
              primary={member.email}
              secondary={
                member.id === currentProject.creator ? "Creator" : null
              }
            />
          </ListItem>
        ))}
      </List>
      {showSearch && (
        <SearchMember onClose={() => setShowSearch(false)}></SearchMember>
      )}
    </Stack>
  );
}

export default ManageAccess;
