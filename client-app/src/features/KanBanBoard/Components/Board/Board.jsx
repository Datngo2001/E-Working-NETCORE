import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Card from '../Card/Card';
import Dropdown from '../Dropdown/Dropdown';
import EditableField from '../../../../components/EditableField/EditableField';

import styles from './board.module.css';
import { IconButton } from '@mui/material';

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles['board']}>
      <div className={styles['header']}>
        <p className={styles['title']}>
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div className={styles['more']}>
          <IconButton onClick={() => setShowDropdown(true)}>
            <MoreHorizIcon />
          </IconButton>
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className={`${styles['cards']} custom-scroll`}>
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <EditableField
          text="+ Add Card"
          placeholder="Enter Card Title"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
