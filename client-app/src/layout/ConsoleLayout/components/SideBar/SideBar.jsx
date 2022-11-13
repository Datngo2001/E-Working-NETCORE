import React from 'react';
import { useSelector } from 'react-redux';
import NavButton from '../NavButton/NavButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import styles from './sideBar.module.css';
import ProjectName from '../ProjectName/ProjectName';
import { useParams } from 'react-router';

function SideBar() {
  const { stageId } = useParams();
  const { currentProject } = useSelector((state) => state.project);
  const { stages, currentStage } = useSelector((state) => state.stage);

  let boardLink = '';
  if (stageId) {
    boardLink = `/console/project/${currentProject?._id}/stage/${stageId}/board`;
  } else if (currentStage) {
    boardLink = `/console/project/${currentProject?._id}/stage/${currentStage._id}/board`;
  } else {
    boardLink = `/console/project/${currentProject?._id}/stage/${stages[0]?._id}/board`;
  }

  return (
    <div className={styles['container']}>
      <ProjectName />
      <NavButton to={`/console/project/${currentProject?._id}/stage`}>
        <DashboardIcon fontSize="inherit" />
        RoadMap
      </NavButton>
      <NavButton to={boardLink}>
        <AlignHorizontalLeftIcon fontSize="inherit" />
        Board
      </NavButton>
    </div>
  );
}

export default SideBar;
