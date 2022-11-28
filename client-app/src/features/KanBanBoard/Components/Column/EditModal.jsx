import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import BasicModal from "../../../../components/modal/BasicModal/BasicModal";
import * as yup from "yup";
import useConfirmModal from "../../../../hooks/useConfirmModal";

const schema = yup.object({
  name: yup.string().required(),
});

function EditModal({ column, updateColumn, onClose }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: column.name },
  });
  const openConfirm = useConfirmModal();

  const onSubmit = (data) => {
    updateColumn(column.id, data);
    onClose();
  };

  const handleClose = () => {
    if (formState.isDirty) {
      openConfirm({
        message: "Save Changes ?",
        onYes: () => {
          let data = getValues();
          updateColumn(column.id, data);
          onClose();
        },
        onNo: () => {
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  return (
    <BasicModal onClose={handleClose}>
      <Paper sx={{ maxWidth: 500, padding: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Stack spacing={1}>
              <TextField
                label="Name"
                type="text"
                rows={3}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                InputProps={{
                  ...register("name"),
                }}
              />
            </Stack>
          </Box>
          <Box sx={{ textAlign: "end", marginTop: 1 }}>
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      </Paper>
    </BasicModal>
  );
}

export default EditModal;
