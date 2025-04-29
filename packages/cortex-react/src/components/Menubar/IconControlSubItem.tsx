import React from 'react';
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from 'react-icons/io5';
import { item } from '../../styles/menubar';
import { IconControlSubItemProps } from './types';

const { icon } = item();

const IconControlSubItem = ({ show, setShow }: IconControlSubItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(!show);
  };
  return (
    <div
      onClick={handleClick}
      data-testid="icon-sub-item-menubar"
      className="flex"
    >
      {show ? (
        <IoCaretUpCircleOutline className={icon()} />
      ) : (
        <IoCaretDownCircleOutline className={icon()} />
      )}
    </div>
  );
};

export default IconControlSubItem;
