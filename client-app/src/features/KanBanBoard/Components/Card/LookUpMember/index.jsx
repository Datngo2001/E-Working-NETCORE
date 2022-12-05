import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import BasicModal from "../../../../../components/modal/BasicModal/BasicModal";
import UserAvatar from "../../../../../components/UserAvatar";
import useConfirmModal from "../../../../../hooks/useConfirmModal";
import CloseIcon from "@mui/icons-material/Close";
import { LOAD_PROJECT_MEMBERS_REQUEST } from "../../../../../store/reducer/project/projectActionTypes";
import { useDispatch, useSelector } from "react-redux";

function LookUpMember({ onClose, onSelectUser }) {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const openConfirm = useConfirmModal();

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECT_MEMBERS_REQUEST,
      payload: currentProject.id,
    });
  }, [currentProject.members]);

  const handleMemberClick = (user) => {
    openConfirm({
      message: `Do you want to assign ${user.email}?`,
      onYes: () => {
        onSelectUser(user);
        onClose();
      },
      onNo: () => {},
    });
  };

  return (
    <BasicModal onClose={onClose}>
      <Paper
        sx={{
          width: 500,
          height: 600,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          <h2 style={{ margin: 0 }}>Assign user</h2>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {currentProject?.members?.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <Button
                  variant="contained"
                  onClick={() => handleMemberClick(user)}
                  edge="end"
                >
                  Add
                </Button>
              }
            >
              <ListItemAvatar>
                <UserAvatar name={user.userName} />
              </ListItemAvatar>
              <ListItemText primary={user.email} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </BasicModal>
  );
}

export default LookUpMember;
