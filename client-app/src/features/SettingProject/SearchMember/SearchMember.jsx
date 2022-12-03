import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import BasicModal from "../../../components/modal/BasicModal/BasicModal";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRef } from "react";
import { searchUsers } from "../../../api/user";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_MEMBERS_REQUEST,
  UPDATE_PROJECT_REQUEST,
} from "../../../store/reducer/project/projectActionTypes";
import useConfirmModal from "../../../hooks/useConfirmModal";
import UserAvatar from "../../../components/UserAvatar";

function SearchMember({ onClose, members = [] }) {
  const dispatch = useDispatch();
  const openConfirm = useConfirmModal();
  const { currentProject } = useSelector((state) => state.project);

  const [term, setTerm] = useState("");
  const [users, setUsers] = useState([]);
  const throttle = useRef();

  const handleSearch = (e) => {
    setTerm(e.target.value);

    if (throttle.current) {
      clearTimeout(throttle.current);
    }

    throttle.current = setTimeout(async () => {
      const res = await searchUsers(e.target.value);
      setUsers(res.data.items);
    }, 250);
  };

  const handleMemberClick = (user) => {
    let ids = currentProject.members.map((m) => m.id);
    openConfirm({
      message: `Do you want to add ${user.email}?`,
      onYes: () => {
        dispatch({
          type: UPDATE_MEMBERS_REQUEST,
          payload: {
            id: currentProject.id,
            data: {
              memberIds: [...ids, user.id],
            },
          },
        });
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
          <h2 style={{ margin: 0 }}>Add Members</h2>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          type="text"
          placeholder="Search"
          sx={{ width: "100%" }}
          value={term}
          onChange={handleSearch}
        />

        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <Button
                  variant="contained"
                  onClick={() => handleMemberClick(user)}
                  edge="end"
                  disabled={members.includes((m) => m.id === user.id)}
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

export default SearchMember;
