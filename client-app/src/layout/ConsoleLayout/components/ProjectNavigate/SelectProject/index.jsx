import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";

function SelectProject({ projects = [], onSelectChange }) {
  const { currentProject } = useSelector((state) => state.project);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    onSelectChange(projects[index]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        sx={{ color: "white", textTransform: "capitalize" }}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClickButton}
      >
        {currentProject?.name}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {projects.map((project, index) => (
          <MenuItem
            key={project.id}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {project.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default SelectProject;
