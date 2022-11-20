import React, { useEffect, useState } from "react";
import styles from "./kanBanBoard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_CARD_REQUEST,
  CREATE_COLUMN_REQUEST,
  DELETE_CARD_REQUEST,
  DELETE_COLUMN_REQUEST,
  LOAD_BOARD_REQUEST,
  UPDATE_CARD_REQUEST,
} from "../../store/reducer/board/boardActionTypes";
import Column from "./Components/Column/Column";
import AddButton from "./Components/AddButton/AddButton";

function KanBanBoard() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.board);
  const { currentProject } = useSelector((state) => state.project);
  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addColumnHandler = (data) => {
    debugger;
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

  const addCardHandler = (id, name) => {
    debugger;
    dispatch({
      type: CREATE_CARD_REQUEST,
      payload: {
        projectId: currentProject.id,
        data: { columnId: id, name: name },
      },
    });
  };

  const removeCard = (bid, cid) => {
    debugger;
    dispatch({
      type: DELETE_CARD_REQUEST,
      payload: {
        projectId: currentProject.id,
        cardId: cid,
      },
    });
  };

  const dragEnded = (bid, cid) => {
    // let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    // s_boardIndex = boards.findIndex((item) => item.id === bid);
    // if (s_boardIndex < 0) return;
    // s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
    //   (item) => item.id === cid
    // );
    // if (s_cardIndex < 0) return;
    // t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    // if (t_boardIndex < 0) return;
    // t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
    //   (item) => item.id === targetCard.cid
    // );
    // if (t_cardIndex < 0) return;
    // const tempBoards = [...boards];
    // const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    // tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    // tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    // // UPDATE_CARD_REQUEST
    // setBoards(tempBoards);
    // setTargetCard({
    //   bid: "",
    //   cid: "",
    // });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    dispatch({
      type: UPDATE_CARD_REQUEST,
      payload: {
        projectId: currentProject.id,
        cardId: cid,
        data: card,
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
