import React, { createElement, useRef, useState } from 'react';
import { DivStyledContainer, ListContainer, ListContainerTo } from './styled';

const Hello = () => {
  const dragRef = useRef(null);
  const dropRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleDragStart = e => {
    e.dataTransfer.setData('id', e.target.id);
  };
  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('id');
    const draggedElement = document.getElementById(draggedId);
    const dropElement = dropRef?.current;
    dropElement.append(draggedElement);
  };

  const handleListClick = e => {
    const nodeItem = dropRef?.current;
  };

  const items = [
    {
      id: 1,
      name: 'Ana Rita',
      type: 'toDo',
    },
    {
      id: 2,
      name: 'Caio',
      type: 'toDo',
    },
    {
      id: 3,
      name: 'Jorge',
      type: 'toDo',
    },
    {
      id: 4,
      name: 'Beatriz',
      type: 'done',
    },
    {
      id: 5,
      name: 'Carla',
      type: 'done',
    },
    {
      id: 6,
      name: 'Ana',
      type: 'done',
    },
  ];

  const currentStyle = {
    backgroundColor: isClicked ? 'white' : 'white',
    cursor: 'grab',
  };

  return (
    <DivStyledContainer>
      <ListContainer>
        <ul style={{ width: '100%', height: '100%', display: 'inline-block' }}>
          {items.map(item => (
            <li
              key={item.id}
              style={currentStyle}
              ref={dragRef}
              id={item.id.toString()}
              draggable
              onDragStart={handleDragStart}
              onClick={handleListClick}
            >
              {' '}
              {item.name}
            </li>
          ))}
        </ul>
      </ListContainer>
      <ListContainer>
        {' '}
        <ul
          id={'drop'}
          ref={dropRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ width: '100%', height: '100%', display: 'inline-block' }}
        >
          {' '}
        </ul>
      </ListContainer>
    </DivStyledContainer>
  );
};

export default Hello;
