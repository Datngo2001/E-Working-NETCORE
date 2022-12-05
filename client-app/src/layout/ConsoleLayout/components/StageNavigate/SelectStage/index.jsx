import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function SelectStage({ stages, onSelectChange }) {
  const {
    board: { stageId },
  } = useSelector((state) => state.board);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    onSelectChange(stages[index]);
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
        {stages?.find((s) => s.id === stageId)?.name}
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
        {stages.map((stage, index) => (
          <MenuItem
            key={stage.id}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {stage.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default SelectStage;
