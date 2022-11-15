import React from 'react';
import ProjectList from '../../features/ProjectList/ProjectList';
import styles from './projectListPage.module.css';
function ProjectListPage() {
  return (
    <div className={styles['container']}>
      <ProjectList />
    </div>
  );
}

export default ProjectListPage;
