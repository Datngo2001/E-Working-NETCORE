import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_STAGE_REQUEST } from '../../store/reducer/stage/stageActionTypes';
import Today from './components/Today/Today';
import Header from './components/Header/Header';
import Body from './components/Body/Body';

function GanttChart({ projectId }) {
  const dispatch = useDispatch();
  const {
    stages,
    ganttChart: { totalDate }
  } = useSelector((state) => state.stage);

  useEffect(() => {
    dispatch({ type: LOAD_STAGE_REQUEST, payload: projectId });
    // return () => {
    //   dispatch({ type: CLEAR_STAGES });
    // };
  }, [projectId]);

  return (
    <div style={{ height: '100%' }}>
      <div
        className="custom-scroll"
        style={{
          display: 'grid',
          gridTemplateRows: `35px 25px repeat(${stages.length + 1}, 45px) auto`,
          gridTemplateColumns: `300px repeat(${totalDate + 1}, 30px )`,
          overflow: 'auto',
          height: '100%',
          position: 'relative'
        }}>
        <Header />

        <Today />

        <Body />
      </div>
    </div>
  );
}

export default React.memo(GanttChart);
