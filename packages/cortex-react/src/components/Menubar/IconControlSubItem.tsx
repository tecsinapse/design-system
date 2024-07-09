import React, { Dispatch } from 'react';
import { item } from '../../styles/menubar';
import {
  IoCaretDownCircleOutline,
  IoCaretUpCircleOutline,
} from 'react-icons/io5';

const { icon } = item();

const IconControlSubItem = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
}) => {
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
