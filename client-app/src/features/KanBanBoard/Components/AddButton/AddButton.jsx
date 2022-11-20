import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./addButton.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required(),
});

function AddButton({ onSubmit, placeholder, text }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [isEditable, setIsEditable] = useState(false);

  return (
    <Box>
      {isEditable ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles["edit"]}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ flexGrow: 1 }}
              type="text"
              size="small"
              placeholder={placeholder}
              autoFocus
              error={errors.name ? true : false}
              InputProps={{
                ...register("name"),
                defaultValue: "",
              }}
            />
            <IconButton variant="outlined" color="primary" type="submit">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => setIsEditable(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </form>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ flexGrow: 1 }}>{text}</Typography>
          <IconButton onClick={() => setIsEditable(true)}>
            <CreateIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default AddButton;
