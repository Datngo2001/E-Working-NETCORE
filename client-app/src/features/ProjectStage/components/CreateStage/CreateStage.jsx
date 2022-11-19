import { Button, IconButton, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_STAGE_REQUEST } from "../../../../store/reducer/stage/stageActionTypes";

function CreateStage({ row }) {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const { stages } = useSelector((state) => state.stage);
  const [isShowForm, setIsShowForm] = useState(false);
  const [stageName, setStageName] = useState("");

  const handleChange = (e) => {
    setStageName(e.target.value);
  };

  const handleCreateClick = () => {
    setIsShowForm(true);
  };

  const handleClose = () => {
    setIsShowForm(false);
  };

  const handleCreate = () => {
    const lastStage = stages[stages.length - 1];
    let startDate;
    if (lastStage) {
      startDate = new Date(lastStage.endDate);
    } else {
      startDate = new Date();
    }
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);
    dispatch({
      type: CREATE_STAGE_REQUEST,
      payload: {
        projectId: currentProject.id,
        data: {
          name: stageName,
          startDate: startDate,
          endDate: endDate,
        },
      },
    });
    setStageName("");
  };

  return (
    <div
      style={{
        gridColumn: 1,
        gridRow: row,
        position: "sticky",
        left: 0,
        zIndex: 4,
        backgroundColor: "inherit",
        borderRight: "2px solid #dfe1e6",
        display: "flex",
        alignItems: "center",
      }}
    >
      {isShowForm ? (
        <div
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            value={stageName}
            onChange={handleChange}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translateY(100%)",
              display: "flex",
            }}
          >
            <IconButton
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "#fff" }}
              onClick={handleCreate}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              size="small"
              sx={{ backgroundColor: "#fff" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <Button
          variant="text"
          sx={{ width: "100%", justifyContent: "flex-start" }}
          onClick={handleCreateClick}
        >
          Create Stage
        </Button>
      )}
    </div>
  );
}

export default CreateStage;
