import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_PROJECT_REQUEST } from "../../../../store/reducer/project/projectActionTypes";
import styles from "./createProjectForm.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required(),
});

function CreateProjectForm({ onProjectCreated }) {
  const { loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch({
      type: CREATE_PROJECT_REQUEST,
      payload: { data: data, success: onProjectCreated },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          label="Project Name"
          multiline
          rows={4}
          InputProps={{
            ...register("name"),
            defaultValue: "",
          }}
        />
        <div className={styles["submit-container"]}>
          <Button type="submit" variant="contained" disabled={loading}>
            Create
          </Button>
        </div>
      </Stack>
    </form>
  );
}

export default CreateProjectForm;
