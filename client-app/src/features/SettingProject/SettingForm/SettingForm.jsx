import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required(),
});

function SettingForm({ project }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    debugger;
  };

  return (
    <form
      autoComplete="off"
      style={{ height: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={1}>
        <TextField
          error={errors.name}
          helperText={errors.name?.message}
          label="Project Name"
          InputProps={{
            ...register("name"),
            defaultValue: project.name,
          }}
        />
        <Box sx={{ textAlign: "end" }}>
          <Button type="submit" variant="contained" size="small">
            Save Changes
          </Button>
        </Box>
      </Stack>
    </form>
  );
}

export default SettingForm;
