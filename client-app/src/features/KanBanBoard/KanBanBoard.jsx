import React, { useEffect, useState } from "react";
import styles from "./kanBanBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_CARD_REQUEST,
  CREATE_COLUMN_REQUEST,
  DELETE_CARD_REQUEST,
  DELETE_COLUMN_REQUEST,
  LOAD_BOARD_REQUEST,
  MOVE_CARD_REQUEST,
  UPDATE_CARD_REQUEST,
  UPDATE_COLUMN_REQUEST,
} from "../../store/reducer/board/boardActionTypes";
import Column from "./Components/Column/Column";
import AddButton from "./Components/AddButton/AddButton";

function KanBanBoard({ projectId, stageId }) {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.board);
  const [targetCard, setTargetCard] = useState({
    columnId: "",
    cardId: "",
  });

  useEffect(() => {
    dispatch({
      type: LOAD_BOARD_REQUEST,
      payload: {
        projectId: projectId,
        stageId: stageId,
      },
    });
  }, [projectId, stageId]);

  const addColumnHandler = (data) => {
    dispatch({
      type: CREATE_COLUMN_REQUEST,
      payload: {
        projectId: projectId,
        data: {
          name: data.name,
          stageId: board.stageId,
        },
      },
    });
  };

  const removeColumn = (columnId) => {
    dispatch({
      type: DELETE_COLUMN_REQUEST,
      payload: {
        projectId: projectId,
        columnId: columnId,
      },
    });
  };

  const updateColumn = (columnId, data) => {
    dispatch({
      type: UPDATE_COLUMN_REQUEST,
      payload: {
        projectId: projectId,
        columnId: columnId,
        data: data,
      },
    });
  };

  const addCardHandler = (columnId, data) => {
    dispatch({
      type: CREATE_CARD_REQUEST,
      payload: {
        projectId: projectId,
        data: { columnId: columnId, stageId: board.stageId, ...data },
      },
    });
  };

  const removeCard = (cardId) => {
    dispatch({
      type: DELETE_CARD_REQUEST,
      payload: {
        projectId: projectId,
        cardId: cardId,
      },
    });
  };

  const dragEnded = (columnId, cardId) => {
    if (targetCard.columnId === columnId) return;
    dispatch({
      type: MOVE_CARD_REQUEST,
      payload: {
        projectId: projectId,
        data: {
          cardId: cardId,
          startColumn: columnId,
          endColumn: targetCard.columnId,
        },
      },
    });
  };

  const dragEntered = (columnId, cardId) => {
    setTargetCard({
      columnId,
      cardId,
    });
  };

  const updateCard = (cardId, data) => {
    dispatch({
      type: UPDATE_CARD_REQUEST,
      payload: {
        projectId: projectId,
        cardId: cardId,
        data: data,
      },
    });
  };

  return (
    <div className={styles["boards"]}>
      {board.columns?.map((item) => (
        <Column
          key={item.id}
          column={item}
          addCard={addCardHandler}
          removeColumn={() => removeColumn(item.id)}
          updateColumn={updateColumn}
          removeCard={removeCard}
          dragEnded={dragEnded}
          dragEntered={dragEntered}
          updateCard={updateCard}
        />
      ))}
      <div className={styles["add-button"]}>
        <AddButton
          placeholder="Enter Column Name"
          text="+ Add Column"
          buttonText="Add Board"
          onSubmit={addColumnHandler}
        />
      </div>
    </div>
  );
}
export default KanBanBoard;
