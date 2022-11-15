import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../../../../util/date';

function Today() {
  const {
    stages,
    ganttChart: { startColumnAt, startDate, stageRowAt }
  } = useSelector((state) => state.stage);
  const todayRef = useRef();

  const column = startColumnAt + dateDiffInDays(Date.now(), startDate) - 1;

  useEffect(() => {
    todayRef.current.scrollIntoView({
      behavior: 'auto',
      inline: 'center'
    });
  }, [column]);

  return (
    <div
      ref={todayRef}
      style={{
        gridColumnStart: column,
        gridRowStart: stageRowAt,
        gridRowEnd: stageRowAt + stages.length + 2,
        zIndex: 2,
        width: '3px',
        height: '100%',
        backgroundColor: '#FF991F',
        transform: 'translateX(13px)'
      }}></div>
  );
}

export default Today;
