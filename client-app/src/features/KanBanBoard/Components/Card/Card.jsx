import { MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { Clock } from "react-feather";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./card.module.css";
import CardInfo from "./CardInfo/CardInfo";
import MenuButton from "../../../../components/MenuButton/MenuButton";
import useConfirmModal from "../../../../hooks/useConfirmModal";
import { Box } from "@mui/system";

function Card({
  card,
  columnId,
  dragEnded,
  dragEntered,
  removeCard,
  updateCard,
}) {
  const openConfirm = useConfirmModal();
  const [showModal, setShowModal] = useState(false);

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          columnId={columnId}
          updateCard={updateCard}
        />
      )}
      <div
        className={styles["card"]}
        draggable
        onDragEnd={() => dragEnded(columnId, card.id)}
        onDragEnter={() => dragEntered(columnId, card.id)}
        onClick={() => setShowModal(true)}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ textTransform: "capitalize" }}>
              {card.name}
            </Typography>
          </Box>
          <MenuButton
            icon={<MoreHorizIcon />}
            renderItems={(close) => [
              <MenuItem
                key={"Delete"}
                onClick={() => {
                  close();
                  openConfirm({
                    message: `Do you want to delete card "${card.name}" ?`,
                    onYes: () => {
                      removeCard(card.id);
                    },
                    onNo: () => {},
                  });
                }}
              >
                Delete
              </MenuItem>,
            ]}
          />
        </Box>
        <div className={styles["footer"]}>
          {card.createDate && (
            <p className={styles["footer-item"]}>
              <Clock className={styles["footer-icon"]} />
              {formatDate(card.createDate)}
            </p>
          )}
          {/* {tasks && tasks?.length > 0 && (
            <p className={styles["footer-item"]}>
              <CheckSquare className={styles["footer-icon"]} />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Card;
