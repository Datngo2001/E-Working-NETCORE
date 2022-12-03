import React, { useRef } from "react";
import BasicModal from "../../../../../components/modal/BasicModal/BasicModal";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import RichTextField from "../../../../../components/RichTextField/RichTextField";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { convertDDMMYYYY } from "../../../../../util/date";
import useConfirmModal from "../../../../../hooks/useConfirmModal";

const schema = yup.object({
  name: yup.string().required(),
});

function CardInfo({ card, columnId, updateCard, onClose }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: card });
  const message = useRef();
  const openConfirm = useConfirmModal();

  const handleDescriptionChange = (newMessage) => {
    message.current = newMessage;
  };

  const onSubmit = (data) => {
    data.message = draftToHtml(
      convertToRaw(message.current.getCurrentContent())
    );
    updateCard(card.id, data);
    onClose();
  };

  const handleClose = () => {
    if (formState.isDirty || message.current !== card.message) {
      openConfirm({
        message: "Save Changes ?",
        onYes: () => {
          let data = getValues();
          data.message = draftToHtml(
            convertToRaw(message.current.getCurrentContent())
          );
          updateCard(card.id, data);
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
      <Paper sx={{ maxWidth: 800, padding: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Stack spacing={1}>
              <TextField
                label="Name"
                type="text"
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                InputProps={{
                  ...register("name"),
                }}
              />
              <Box>
                <RichTextField
                  defaultValue={card.message}
                  onChange={handleDescriptionChange}
                />
              </Box>
            </Stack>
            <Stack spacing={1} sx={{ flexShrink: 0 }}>
              <TextField
                label="Create Date"
                type="text"
                value={convertDDMMYYYY(card.createDate)}
                InputProps={{
                  readOnly: true,
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

export default CardInfo;
