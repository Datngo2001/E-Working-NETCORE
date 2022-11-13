import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { CheckSquare, Clock } from 'react-feather';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Dropdown from '../Dropdown/Dropdown';

import styles from './card.module.css';
import CardInfo from './CardInfo/CardInfo';

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels } = props.card;

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (!date) return '';

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Aprl',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + ' ' + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className={styles['card']}
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}>
        <div className={styles['top']}>
          <div className={styles['labels']}>
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div className={styles['more']}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setShowDropdown(true);
              }}>
              <MoreHorizIcon />
            </IconButton>{' '}
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <p onClick={() => props.removeCard(props.boardId, id)}>Delete Card</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className={styles['title']}>{title}</div>
        <div className={styles['footer']}>
          {date && (
            <p className={styles['footer-item']}>
              <Clock className={styles['footer-icon']} />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className={styles['footer-item']}>
              <CheckSquare className={styles['footer-icon']} />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
