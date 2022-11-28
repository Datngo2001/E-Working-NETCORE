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
} from "../../store/reducer/board/boardActionTypes";
import Column from "./Components/Column/Column";
import AddButton from "./Components/AddButton/AddButton";

function KanBanBoard() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.board);
  const { currentProject } = useSelector((state) => state.project);
  const [targetCard, setTargetCard] = useState({
    columnId: "",
    cardId: "",
  });

  const addColumnHandler = (data) => {
    dispatch({
      type: CREATE_COLUMN_REQUEST,
      payload: {
        projectId: currentProject.id,
        data: {
          name: data.name,
        },
      },
    });
  };

  const removeColumn = (columnId) => {
    dispatch({
      type: DELETE_COLUMN_REQUEST,
      payload: {
        projectId: currentProject.id,
        columnId: columnId,
      },
    });
  };

  const addCardHandler = (columnId, data) => {
    dispatch({
      type: CREATE_CARD_REQUEST,
      payload: {
        projectId: currentProject.id,
        data: { columnId: columnId, stageId: board.stageId, ...data },
      },
    });
  };

  const removeCard = (cardId) => {
    dispatch({
      type: DELETE_CARD_REQUEST,
      payload: {
        projectId: currentProject.id,
        cardId: cardId,
      },
    });
  };

  const dragEnded = (columnId, cardId) => {
    if (targetCard.columnId === columnId) return;
    dispatch({
      type: MOVE_CARD_REQUEST,
      payload: {
        projectId: currentProject.id,
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
        projectId: currentProject.id,
        cardId: cardId,
        data: data,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: LOAD_BOARD_REQUEST,
      payload: {
        projectId: currentProject.id,
      },
    });
  }, []);

  return (
    <div className={styles["boards"]}>
      {board.columns?.map((item) => (
        <Column
          key={item.id}
          column={item}
          addCard={addCardHandler}
          removeColumn={() => removeColumn(item.id)}
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
