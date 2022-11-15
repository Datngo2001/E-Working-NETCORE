import React from 'react';
import { useNavigate } from 'react-router';
import BaseFullScreenModal from '../../components/modal/BaseFullScreenModal/BaseFullScreenModal';
import CreateProjectForm from './components/CreateProjectForm/CreateProjectForm';
import styles from './createProjectModal.module.css';
function CreateProjectModal({ isOpen, closeModal }) {
  const navigate = useNavigate();
  return (
    <BaseFullScreenModal isOpen={isOpen} closeModal={closeModal}>
      <div className={styles['modal-container']}>
        <CreateProjectForm
          onProjectCreated={(project) => {
            closeModal();
            navigate(`/console/project/${project._id}/stage`);
          }}
        />
      </div>
    </BaseFullScreenModal>
  );
}

export default CreateProjectModal;
