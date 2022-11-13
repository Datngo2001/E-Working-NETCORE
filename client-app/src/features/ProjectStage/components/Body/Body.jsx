import React from 'react';
import { useSelector } from 'react-redux';
import CreateStage from '../CreateStage/CreateStage';
import Stage from '../Stage/Stage';
import StageItem from '../StageItem/StageItem';
import styles from './body.module.css';

function Body() {
  const {
    stages,
    ganttChart: { totalDate, stageRowAt }
  } = useSelector((state) => state.stage);

  return (
    <div className={styles['body']}>
      {stages.map((stage, index) => (
        <div key={stage._id} className={styles['row']}>
          <StageItem stage={stage} row={stageRowAt + index} />
          <Stage stage={stage} row={stageRowAt + index} />
          <div
            style={{
              backgroundColor: 'inherit',
              gridRow: stageRowAt + index,
              gridColumnStart: 1,
              gridColumnEnd: totalDate + 3,
              height: '100%'
            }}></div>
        </div>
      ))}

      <div className={styles['row']}>
        <CreateStage row={stageRowAt + stages.length} />
        <div
          style={{
            backgroundColor: 'inherit',
            gridRow: stageRowAt + stages.length,
            gridColumnStart: 1,
            gridColumnEnd: totalDate + 3,
            height: '100%'
          }}></div>
      </div>

      {/* Stage placeholder */}
      <div
        style={{
          position: 'sticky',
          left: 0,
          gridRowStart: stageRowAt + stages.length + 1,
          gridRowEnd: 'auto',
          gridColumn: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          borderRight: '2px solid #dfe1e6',
          zIndex: 3
        }}></div>
    </div>
  );
}

export default Body;
