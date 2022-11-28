import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "../Card/Card";
import styles from "./column.module.css";
import { MenuItem } from "@mui/material";
import AddButton from "../AddButton/AddButton";
import MenuButton from "../../../../components/MenuButton/MenuButton";
import useConfirmModal from "../../../../hooks/useConfirmModal";
import EditModal from "./EditModal";

function Column({
  column,
  removeColumn,
  updateColumn,
  removeCard,
  dragEntered,
  dragEnded,
  updateCard,
  addCard,
}) {
  const openConfirm = useConfirmModal();
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div
      className={styles["column"]}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => dragEntered(column?.id, null)}
    >
      <div className={styles["header"]}>
        <p className={styles["title"]}>
          {column?.name}
          <span>{column?.cards?.length || 0}</span>
        </p>
        <div className={styles["more"]}>
          <MenuButton
            icon={<MoreHorizIcon />}
            renderItems={(close) => [
              <MenuItem
                key={"Edit"}
                onClick={() => {
                  close();
                  setOpenEdit(true);
                }}
              >
                Edit
              </MenuItem>,
              <MenuItem
                key={"Delete"}
                onClick={() => {
                  close();
                  openConfirm({
                    message: `Do you want to delete column "${column?.name}" ?`,
                    onYes: () => {
                      removeColumn();
                    },
                    onNo: () => {},
                  });
                }}
              >
                Delete
              </MenuItem>,
            ]}
          />
        </div>
      </div>
      <div className={`${styles["cards"]} custom-scroll`}>
        {column?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            columnId={column.id}
            removeCard={removeCard}
            dragEntered={dragEntered}
            dragEnded={dragEnded}
            updateCard={updateCard}
          />
        ))}
        <AddButton
          text="+ Add Card"
          placeholder="Enter Column Name"
          onSubmit={(data) => addCard(column?.id, data)}
        />
      </div>
      {openEdit && (
        <EditModal
          column={column}
          updateColumn={updateColumn}
          onClose={() => setOpenEdit(false)}
        />
      )}
    </div>
  );
}

export default Column;
