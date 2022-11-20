import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./column.module.css";
import { IconButton } from "@mui/material";
import AddButton from "../AddButton/AddButton";

function Column(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles["column"]}>
      <div className={styles["header"]}>
        <p className={styles["title"]}>
          {props.column?.name}
          <span>{props.column?.cards?.length || 0}</span>
        </p>
        <div className={styles["more"]}>
          <IconButton onClick={() => setShowDropdown(true)}>
            <MoreHorizIcon />
          </IconButton>
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <p onClick={() => props.removecolumn()}>Delete column</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className={`${styles["cards"]} custom-scroll`}>
        {props.column?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            columnId={props.column.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <AddButton
          text="+ Add Card"
          placeholder="Enter Column Name"
          onSubmit={(value) => props.addCard(props.column?.id, value)}
        />
      </div>
    </div>
  );
}

export default Column;
