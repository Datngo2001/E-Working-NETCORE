import { Box } from "@mui/material";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  STAGE_STARTDATE_UPDATE_REQUEST,
  STAGE_ENDDATE_UPDATE_REQUEST,
} from "../../../../store/reducer/stage/stageActionTypes";
import { convertDDMMYYYY, dateDiffInDays } from "../../../../util/date";
import styles from "./stage.module.css";

function Stage({ stage, row }) {
  const dispatch = useDispatch();
  const {
    ganttChart: { startColumnAt, startDate },
  } = useSelector((state) => state.stage);
  const { currentProject } = useSelector((state) => state.project);

  const [startColumn, setStartColumn] = useState(
    startColumnAt + dateDiffInDays(stage.startDate, startDate)
  );
  const [endColumn, setEndColumn] = useState(
    startColumn + dateDiffInDays(stage.endDate, stage.startDate) + 1
  );

  const startPos = useRef(null);
  const endPos = useRef(null);
  const [startDateTemp, setStartDateTemp] = useState(new Date(stage.startDate));
  const [endDateTemp, setEndDateTemp] = useState(new Date(stage.endDate));

  const handleStartDrag = (e) => {
    if (startPos.current == null) {
      startPos.current = e.pageX;
      return;
    }

    if (e.pageX === 0) return;

    // to right
    if (e.pageX - startPos.current > 30) {
      setStartColumn((val) => val + 1);

      setStartDateTemp((val) => {
        val.setDate(val.getDate() + 1);
        return val;
      });

      startPos.current = e.pageX;
    }
    // to left
    if (e.pageX - startPos.current < -30) {
      setStartColumn((val) => val - 1);

      setStartDateTemp((val) => {
        val.setDate(val.getDate() - 1);
        return val;
      });

      startPos.current = e.pageX;
    }
  };

  const handleEndDrag = (e) => {
    if (endPos.current == null) {
      endPos.current = e.pageX;
      return;
    }

    if (e.pageX === 0) return;

    // to right
    if (e.pageX - endPos.current > 30) {
      setEndColumn((val) => val + 1);

      setEndDateTemp((val) => {
        val.setDate(val.getDate() + 1);
        return val;
      });

      endPos.current = e.pageX;
    }
    // to left
    if (e.pageX - endPos.current < -30) {
      setEndColumn((val) => val - 1);

      setEndDateTemp((val) => {
        val.setDate(val.getDate() - 1);
        return val;
      });

      endPos.current = e.pageX;
    }
  };

  const handleStartDragDone = () => {
    dispatch({
      type: STAGE_STARTDATE_UPDATE_REQUEST,
      payload: {
        projectId: currentProject.id,
        id: stage.id,
        date: startDateTemp,
      },
    });
  };

  const handleEndDragDone = () => {
    dispatch({
      type: STAGE_ENDDATE_UPDATE_REQUEST,
      payload: {
        projectId: currentProject.id,
        id: stage.id,
        date: endDateTemp,
      },
    });
  };

  return (
    <div
      style={{
        gridRow: row,
        gridColumnStart: startColumn,
        gridColumnEnd: endColumn,
        height: "100%",
        display: "flex",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <Box
        sx={{ backgroundColor: "secondary.main" }}
        className={styles["stage"]}
      >
        <div className={styles["start-date"]}>
          {convertDDMMYYYY(startDateTemp)}
        </div>
        <div className={styles["end-date"]}>{convertDDMMYYYY(endDateTemp)}</div>
        <button
          className={styles["start-button"]}
          onDragCapture={handleStartDrag}
          onDragEnd={handleStartDragDone}
          draggable
        ></button>
        <button
          className={styles["end-button"]}
          onDragCapture={handleEndDrag}
          onDragEnd={handleEndDragDone}
          draggable
        ></button>
      </Box>
    </div>
  );
}

export default Stage;
