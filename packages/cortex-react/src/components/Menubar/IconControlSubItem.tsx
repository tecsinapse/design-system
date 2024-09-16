import React from 'react';
import { item } from '../../styles/menubar';
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from 'react-icons/io5';
import { IconControlSubItemProps } from './types';

const { icon } = item();

const IconControlSubItem = ({ show, setShow }: IconControlSubItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(!show);
  };
  return (
    <div onClick={handleClick} data-testid="icon-sub-item-menubar">
      {show ? (
        <IoCaretUpCircleOutline className={icon()} />
      ) : (
        <IoCaretDownCircleOutline className={icon()} />
      )}
    </div>
  );
};

export default IconControlSubItem;
