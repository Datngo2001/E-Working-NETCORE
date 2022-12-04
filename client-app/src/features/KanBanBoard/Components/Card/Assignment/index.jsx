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
import React, { useState } from "react";
import UserAvatar from "../../../../../components/UserAvatar";
import useConfirmModal from "../../../../../hooks/useConfirmModal";
import ClearIcon from "@mui/icons-material/Clear";
import LookUpMember from "../LookUpMember";
import { useEffect } from "react";

function Assignment({ assignTo, onUserChange }) {
  const [user, setUser] = useState(assignTo);
  const [showSearch, setShowSearch] = useState(false);
  const openConfirm = useConfirmModal();

  const handleDeleteClick = (member) => {
    openConfirm({
      message: `Do you want to delete ${member.email}?`,
      onYes: () => {
        setUser(null);
      },
      onNo: () => {},
    });
  };

  useEffect(() => {
    onUserChange(user);
  }, [user]);

  return (
    <Box>
      {user ? (
        <Paper sx={{ padding: 1 }}>
          <h4>Assign to</h4>
          <List>
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(user)}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <UserAvatar name={user.userName} />
              </ListItemAvatar>
              <ListItemText primary={user.userName} />
            </ListItem>
          </List>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => setShowSearch(true)}
            sx={{ width: "100%" }}
          >
            Assign to member
          </Button>
        </Box>
      )}

      {showSearch && (
        <LookUpMember
          onClose={() => setShowSearch(false)}
          onSelectUser={(user) => setUser(user)}
        ></LookUpMember>
      )}
    </Box>
  );
}

export default Assignment;
