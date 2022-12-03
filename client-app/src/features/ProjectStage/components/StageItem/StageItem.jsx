import {
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import styles from "./stageItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_STAGE_REQUEST,
  UPDATE_STAGE_NAME_REQUEST,
} from "../../../../store/reducer/stage/stageActionTypes";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router";
import { SET_CURRENT_STAGE } from "../../../../store/reducer/stage/stageActionTypes";
import useConfirmModal from "../../../../hooks/useConfirmModal";

function StageItem({ stage, row }) {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const navigate = useNavigate();
  const [editting, setEditting] = useState(false);
  const [stageName, setStageName] = useState(stage.name);
  const openConfirm = useConfirmModal();
  const [anchorMoreMenu, setAnchorMoreMenu] = React.useState(null);
  const openMoreMenu = Boolean(anchorMoreMenu);

  const handleMoreClick = (event) => {
    setAnchorMoreMenu(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorMoreMenu(null);
  };

  const handleDelete = () => {
    openConfirm({
      message: "Do you want to delete stage?",
      onYes: () => {
        dispatch({
          type: DELETE_STAGE_REQUEST,
          payload: { projectId: currentProject.id, id: stage.id },
        });
      },
      onNo: () => {},
    });
  };

  const handleEdit = () => {
    setEditting(true);
  };

  const handleCancel = () => {
    setEditting(false);
  };

  const handleNameChange = (e) => {
    setStageName(e.target.value);
  };

  const handleSave = () => {
    dispatch({
      type: UPDATE_STAGE_NAME_REQUEST,
      payload: { projectId: currentProject.id, id: stage.id, name: stageName },
    });
    setEditting(false);
  };

  return (
    <ListItem
      className={styles["stage"]}
      style={{
        gridColumn: 1,
        gridRow: row,
        position: "sticky",
        left: 0,
        zIndex: 3,
        backgroundColor: "inherit",
        borderRight: "2px solid #dfe1e6",
        display: "flex",
        alignItems: "center",
        paddingLeft: "8px",
      }}
    >
      {editting ? (
        <>
          <TextField
            size="small"
            variant="outlined"
            sx={{ backgroundColor: "#fff" }}
            value={stageName}
            onChange={handleNameChange}
          />
          <IconButton edge="end" sx={{ marginRight: 0.5 }} onClick={handleSave}>
            <CheckIcon />
          </IconButton>
          <IconButton edge="end" onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Tooltip title={stage.name}>
            <ListItemText sx={{ overflow: "hidden" }} primary={stage.name} />
          </Tooltip>
          <div className={styles["button-group"]}>
            <IconButton onClick={handleMoreClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorMoreMenu}
              open={openMoreMenu}
              onClose={handleMoreClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMoreClose();
                  handleEdit();
                }}
              >
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMoreClose();
                  handleDelete();
                }}
              >
                <DeleteIcon />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMoreClose();
                  navigate(
                    `/console/project/${currentProject.id}/board?stageId=${stage.id}`
                  );
                  dispatch({ type: SET_CURRENT_STAGE, payload: stage });
                }}
              >
                <DashboardIcon />
                Boards
              </MenuItem>
            </Menu>
          </div>
        </>
      )}
    </ListItem>
  );
}

export default StageItem;
