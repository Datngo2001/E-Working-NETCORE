import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./column.module.css";
import { IconButton, MenuItem } from "@mui/material";
import AddButton from "../AddButton/AddButton";
import MenuButton from "../../../../components/MenuButton/MenuButton";

function Column({
  column,
  removeColumn,
  removeCard,
  dragEntered,
  dragEnded,
  updateCard,
  addCard,
}) {
  return (
    <div className={styles["column"]}>
      <div className={styles["header"]}>
        <p className={styles["title"]}>
          {column?.name}
          <span>{column?.cards?.length || 0}</span>
        </p>
        <div className={styles["more"]}>
          <MenuButton
            icon={<MoreHorizIcon />}
            renderItems={(close) => [
              <MenuItem key={"Edit"} onClick={close}>
                Edit
              </MenuItem>,
              <MenuItem
                key={"Delete"}
                onClick={() => {
                  close();
                  removeColumn();
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
          onSubmit={(value) => addCard(column?.id, value)}
        />
      </div>
    </div>
  );
}

export default Column;
